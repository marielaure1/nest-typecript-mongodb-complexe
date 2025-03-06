// Base
import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Ip,
	Post,
	Put,
	Req,
	Res,
	UseInterceptors,
	UnauthorizedException,
	Logger,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";

// Dependencies
import type { Response, Request } from "express";
import { Connection } from "mongoose";

// Helpers
import { Responses } from "@helpers/responses.helper";
import { Hash } from "@helpers/hash.helper";
import { Token } from "@helpers/token.helper";
import { MailHelper } from "@src/providers/mail/helpers/mail.helper";
import { LogsHelper } from "@modules/logs/helpers/logs.helper";

// Services
import { UsersService } from "@modules/users/users.service";
import { ClientsService } from "@modules/clients/clients.service";

// Enums
import { UserStatusEnum } from "@enums/user-status.enum";
import { TokenTypeEnum } from "@enums/token-type.enum";

// Interceptors
import { LogInterceptor } from "@interceptors/log.interceptor";

// DTOs
import { ResetPasswordDto } from "@dtos/reset-password.dto";
import { ForgotPasswordDto } from "@modules/auth/dto/forgot-password.dto";
import { SendConfirmEmailDto } from "@modules/auth/dto/send-confirm-email.dto";

let logger = new Logger();

/**
 * Controller for handling authentication-related operations - Manage password.
 */
@ApiTags("auth")
@Controller("auth")
@UseInterceptors(LogInterceptor)
export class AuthManageController {
	/**
	 * Creates an instance of AuthController.
	 *
	 * @param {UsersService} userService - The service handling user operations.
	 * @param {MailHelper} mailHelper - The helper service for mail.
	 * @param {Connection} connection - The database connection instance.
	 * @param {LogsHelper} logsHelper - The helper service for logging.
	 */
	constructor(
		private readonly userService: UsersService,
		private readonly mailHelper: MailHelper,
		private readonly connection: Connection,
		private readonly logsHelper: LogsHelper,
	) {}

	/**
	 * Reset or init password
	 * @param resetPasswordDto : ResetPasswordDto
	 * @param res : Response
	 * @returns : Response
	 */
	@ApiBearerAuth(TokenTypeEnum.RESET_PASSWORD)
	@ApiOperation({
		summary: "Reset or initialize password",
		description:
			"This endpoint requires a RESET_PASSWORD token in the Authorization header.",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Password successfully reinitialized",
		content: {
			"application/json": {
				example: {
					status: 200,
					success: true,
					message: "Password successfully reinitialized.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Invalid or expired token",
		content: {
			"application/json": {
				example: {
					status: 400,
					success: false,
					error: "Invalid or expired token.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "User not found",
		content: {
			"application/json": {
				example: {
					status: 404,
					success: false,
					error: "User not found.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "An error occurred while resetting the password",
		content: {
			"application/json": {
				example: {
					status: 500,
					success: false,
					error: "An error occurred while resetting the password",
				},
			},
		},
	})
	@Put("reset-password")
	async resetPassword(
		@Body() resetPasswordDto: ResetPasswordDto,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const { newPassword } = resetPasswordDto;
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			const authHeader = req.headers.authorization;

			if (!authHeader || !authHeader.startsWith("Bearer ")) {
				throw new UnauthorizedException(
					"Missing or invalid authentication token",
				);
			}

			const token = authHeader.split(" ")[1];

			// Verify token
			const decoded = Token.verifyToken({
				token,
				type: TokenTypeEnum.RESET_PASSWORD,
			});

			if (!decoded) {
				throw new Error("Invalid token");
			}

			// Get payload
			const payload = Token.getPayload(token);

			if (!payload || !payload.sub) {
				throw new Error("Invalid token");
			}

			// Find user
			const user = await this.userService.findOneById({
				id: payload.sub.toString(),
			});

			if (!user) {
				throw new Error("User not found");
			}

			// Hash password
			user.password = await Hash.hashData(newPassword);

			// Update password
			const updatePassword = await this.userService.update({
				id: user._id.toString(),
				updateDto: {
					password: user.password,
				},
			});

			if (!updatePassword) {
				throw new Error("The password could not be updated");
			}

			// Log the password reset

			await session.commitTransaction();

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				message: "Password successfully reinitialized.",
			});
		} catch (error: any) {
			await session.abortTransaction();

			if (error.message === "User not found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: "User not found.",
					errorDatas: error,
				});
			} else if (
				["Invalid token", "jwt malformed"].includes(error.message)
			) {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.BAD_REQUEST,
					error: "Invalid or expired token.",
					errorDatas: error,
				});
			}

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: "An error occurred while resetting the password.",
				errorDatas: error,
			});
		} finally {
			session.endSession();
		}
	}

	/**
	 * Forgot Password
	 * @param forgotPasswordDto : ForgotPasswordDto
	 * @param res : Response
	 * @param ip : string
	 * @returns : Response
	 */
	@ApiOperation({
		summary: "Forgot password",
		description: "Send a password reset link to the user's email.",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Password reset link sent to the user's email",
		content: {
			"application/json": {
				example: {
					status: 200,
					success: true,
					message:
						"If this account exists, a password reset link has been sent to the user's email.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "User with this email does not exist",
		content: {
			"application/json": {
				example: {
					status: 404,
					success: false,
					error: "User not found.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description:
			"Email could not be sent | An error occurred while processing the forgot password request",
		content: {
			"application/json": {
				examples: {
					emailNotSend: {
						summary: "Email could not be sent",
						value: {
							status: 500,
							success: false,
							error: "Email could not be sent.",
						},
					},
					serverError: {
						summary:
							"An error occurred while processing the forgot password request",
						value: {
							status: 500,
							success: false,
							error: "An error occurred while processing the forgot password request",
						},
					},
				},
			},
		},
	})
	@Post("forgot-password")
	async forgotPassword(
		@Body() forgotPasswordDto: ForgotPasswordDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const { email } = forgotPasswordDto;
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Find user
			const user = await this.userService.findOne({
				filter: {
					email,
				},
			});

			// Check if user exists
			if (!user) {
				throw new Error("User not found");
			}

			const payload = {
				sub: user._id,
				email: user.email,
				type: TokenTypeEnum.RESET_PASSWORD,
			};
			const resetToken = Token.generateToken(payload);

			// Send email
			const sendEmail = await this.mailHelper.sendResetPasswordEmail({
				to: [user.email],
				templateDatas: {
					token: resetToken,
				},
			});

			if (!sendEmail) {
				throw new Error("Email could not be sent");
			}

			await session.commitTransaction();

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				message:
					"If this account exist, the password reset link sent to the user's email.",
			});
		} catch (error: any) {
			await session.abortTransaction();

			if (error.message === "User not found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: "User not found.",
					errorDatas: error,
				});
			} else if (error.message === "Email could not be sent") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: "Email could not be sent.",
					errorDatas: error,
				});
			}

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: "An error occurred while processing the forgot password request.",
				errorDatas: error,
			});
		} finally {
			session.endSession();
		}
	}

	/**
	 * Confirm user account
	 * @param token : string
	 * @param res : Response
	 * @returns : Response
	 */
	@ApiBearerAuth(TokenTypeEnum.CONFIRMATION_ACCOUNT)
	@ApiOperation({
		summary: "Confirm user account",
		description:
			"This endpoint requires a CONFIRMATION_ACCOUNT token in the Authorization header.",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The user account has been successfully verified.",
		content: {
			"application/json": {
				example: {
					status: 200,
					success: true,
					message: "The user account has been successfully verified.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Invalid token.",
		content: {
			"application/json": {
				example: {
					status: 400,
					success: false,
					error: "Invalid token.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "User not found.",
		content: {
			"application/json": {
				example: {
					status: 404,
					success: false,
					error: "User not found.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.GONE,
		description: "Token expired.",
		content: {
			"application/json": {
				example: {
					status: 410,
					success: false,
					error: "Token expired - A new confirmation email has been sent",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "An error occurred while confirming the account.",
		content: {
			"application/json": {
				example: {
					status: 500,
					success: false,
					error: "An error occurred while confirming the account",
				},
			},
		},
	})
	@Get("confirm")
	async confirm(@Req() req: Request, @Res() res: Response) {
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			const authHeader = req.headers.authorization;

			if (!authHeader || !authHeader.startsWith("Bearer ")) {
				throw new UnauthorizedException(
					"Missing or invalid authentication token",
				);
			}

			const token = authHeader.split(" ")[1];

			// Verify token
			const verifyToken = Token.verifyToken({
				token,
				type: TokenTypeEnum.CONFIRMATION_ACCOUNT,
			});

			if (!verifyToken) {
				throw new Error("Invalid token");
			}

			// Get payload
			const payload = Token.getPayload(token);

			if (!payload || !payload.sub) {
				throw new Error("Invalid token");
			}

			// Find user
			const user = await this.userService.findOne({
				filter: {
					_id: payload.sub.toString(),
				},
			});

			if (!user) {
				throw new Error("User not found");
			}

			if (user.isVerified) {
				throw new Error("Invalid token");
			}

			// Check if token is expired
			const isExpired = Token.isTokenExpired(token);

			if (isExpired) {
				await this.userService.sendConfirmAccountUser({
					user,
				});

				throw new Error("Token expired");
			}

			// Update user status
			await this.userService.update({
				id: user.id,
				updateDto: {
					status: UserStatusEnum.AVAILABLE,
					isVerified: true,
				},
			});

			await session.commitTransaction();

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				message: "The user account has been successfully verified.",
			});
		} catch (error: any) {
			await session.abortTransaction();

			if (error.message === "User not found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: "User not found.",
					errorDatas: error,
				});
			} else if (
				["Invalid token", "invalid signature"].includes(error.message)
			) {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.BAD_REQUEST,
					error: "Invalid token.",
					errorDatas: error,
				});
			} else if (
				["Token expired", "jwt expired"].includes(error.message)
			) {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.GONE,
					error: "Token expired - A new confirmation email has been sent.",
					errorDatas: error,
				});
			}

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: "An error occurred while confirming the account.",
				errorDatas: error,
			});
		} finally {
			session.endSession();
		}
	}

	/**
	 * Send Confirm Email
	 * @param sendConfirmEmailDto : SendConfirmEmailDto
	 * @param res : Response
	 * @param ip : string
	 * @returns : Response
	 */
	@ApiOperation({
		summary: "Send Confirm Email",
		description: "Send a confirm account email to the user.",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Confirm account email to the user",
		content: {
			"application/json": {
				example: {
					status: 200,
					success: true,
					message:
						"If this account exists, a confirm email has been sent to the user's email.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "User with this email does not exist",
		content: {
			"application/json": {
				example: {
					status: 404,
					success: false,
					error: "User not found.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: "User already verified",
		content: {
			"application/json": {
				example: {
					status: 409,
					success: false,
					error: "User already verified.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description:
			"Email could not be sent | An error occurred while processing the send confirm email request",
		content: {
			"application/json": {
				examples: {
					emailNotSend: {
						summary: "Email could not be sent",
						value: {
							status: 500,
							success: false,
							error: "Email could not be sent.",
						},
					},
					serverError: {
						summary:
							"An error occurred while processing the send confirm email request",
						value: {
							status: 500,
							success: false,
							error: "An error occurred while processing the send confirm email request",
						},
					},
				},
			},
		},
	})
	@Post("send-confirm-email")
	async sendConfirmEmail(
		@Body() sendConfirmEmailDto: SendConfirmEmailDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const { email } = sendConfirmEmailDto;
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Find user
			const user = await this.userService.findOne({
				filter: {
					email,
				},
			});

			// Check if user exists
			if (!user) {
				throw new Error("User not found");
			}

			if (user.isVerified) {
				throw new Error("User already verified");
			}

			await this.userService.sendConfirmAccountUser({
				user,
				canThrowError: true,
			});

			await this.logsHelper.logInfo({
				req,
				ip,
				userId: user._id.toString(),
				email: user.email,
				message: `${user.userType} Account confirmation email sent`,
				context: req.url,
				metadata: {
					userInfo: user._id.toString(),
				},
			});
			await session.commitTransaction();

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				message:
					"If this account exist, the confirm email sent to the user's email.",
			});
		} catch (error: any) {
			await session.abortTransaction();

			if (error.message === "User not found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: "User with this email does not exist.",
					errorDatas: error,
				});
			} else if (error.message === "User already verified") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.CONFLICT,
					error: "User already verified.",
					errorDatas: error,
				});
			} else if (error.message === "Email could not be sent") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: "Email could not be sent.",
					errorDatas: error,
				});
			}

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: "An error occurred while processing the send confirm email request.",
				errorDatas: error,
			});
		} finally {
			session.endSession();
		}
	}
}
