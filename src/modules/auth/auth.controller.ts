import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Ip,
	Param,
	Post,
	Put,
	Res,
} from "@nestjs/common";
import { UsersService } from "@modules/users/users.service";
import { ClientsService } from "@modules/clients/clients.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Responses } from "@helpers/responses.helper";
import { CreateAuthClientDto } from "@modules/auth/dto/create-auth-client.dto";
import { Response } from "express";
import { NotificationHelper } from "@helpers/notification.helper";
import Hash from "@helpers/hash.helper";
import { Token } from "@helpers/token.helper";
import { UserStatusEnum } from "@enums/user-status.enum";
import { LogsService } from "@modules/logs/logs.service";
import { MailHelper } from "@services/mail/helpers/mail.helper";
import { TokenTypeEnum } from "@enums/token-type.enum";
import { LoginUserDto } from "@modules/auth/dto/login-user.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { LogLevelEnum } from "@enums/logs.enum";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(
		private readonly userService: UsersService,
		private readonly clientService: ClientsService,
		private readonly mailHelper: MailHelper,
		private readonly logService: LogsService,
	) {}

	/**
	 * Register a new client
	 * @param createAuthClientDto : CreateAuthClientDto
	 * @param res : Response
	 * @returns : Response
	 */
	@ApiOperation({ summary: "Register a new client" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The client has been successfully registered.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid input data.",
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: "Conflict - Email or phone number already exists.",
	})
	@ApiResponse({
		status: HttpStatus.UNPROCESSABLE_ENTITY,
		description: "Unprocessable Entity - Phone number is required.",
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
	})
	@Post("register/client")
	async registerClient(
		@Body() createAuthClientDto: CreateAuthClientDto,
		@Res() res: Response,
		@Ip() ip: string,
	) {
		const path = "register";
		const method = "Post";

		try {
			// Check if phone number is required
			NotificationHelper.isPhoneRequired(
				createAuthClientDto.phone,
				createAuthClientDto.notificationSms,
			);

			// Hash password
			createAuthClientDto.password = await Hash.hashData(
				createAuthClientDto.password,
			);

			// Create user and client
			let user = await this.userService.create(createAuthClientDto);
			const client = await this.clientService.create({
				...createAuthClientDto,
				userId: user?._id?.toString(),
			});

			user = await this.userService.findOne(user?._id?.toString());

			// Generate token for email confirmation
			const payload = { sub: user._id, email: user.email };

			const token = Token.generateToken(payload);

			// Email confirmation for the client
			await this.mailHelper.sendConfirmAccountClient({
				to: [user.email],
				templateDatas: {
					firstName: client.firstName,
					token: token,
				},
			});

			// Log the registration
			try {
				await this.logService.create({
					ip,
					userId: user._id.toString(),
					firstName: client.firstName,
					lastName: client.lastName,
					level: LogLevelEnum.INFO,
					message: "User successfully registered",
					context: `AuthController > ${path}: `,
					metadata: { user, client },
				});
			} catch (logError) {
				console.error(`Failed to create log in ${path}: `, logError);
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.CREATED,
				subject: "auth",
				data: {
					user,
					client,
				},
			});
		} catch (error) {
			console.error(`AuthController > ${path} : `, error);

			if (
				error.message.includes("E11000 duplicate key error collection")
			) {
				let errorMessage = "An account already exists";

				if (error.message.includes("email_1")) {
					errorMessage = "An account with this email already exists";
				} else if (error.message.includes("phone_1")) {
					errorMessage =
						"An account with this phone number already exists";
				}

				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.CONFLICT,
					subject: "auth",
					error: errorMessage,
				});
			} else if (error.message === "Phone number is required") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.UNPROCESSABLE_ENTITY,
					subject: "auth",
					error: "Phone number is required",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while creating the account",
			});
		}
	}

	/**
	 * Register a new client
	 * @param createAuthClientDto : CreateAuthClientDto
	 * @param res : Response
	 * @returns : Response
	 */
	@ApiOperation({ summary: "Register a new organization" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The organization has been successfully registered.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid input data.",
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: "Conflict - Email or phone number already exists.",
	})
	@ApiResponse({
		status: HttpStatus.UNPROCESSABLE_ENTITY,
		description: "Unprocessable Entity - Phone number is required.",
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
	})
	@Post("register/organization")
	async registerOrganization(
		@Body() createAuthOrganizationDto: CreateAuthOrganizationDto,
		@Res() res: Response,
		@Ip() ip: string,
	) {
		const path = "registerOrganization";
		const method = "Post";

		try {
			// Hash password
			createAuthOrganizationDto.password = await Hash.hashData(
				createAuthOrganizationDto.password,
			);

			// Create user and organization
			let user = await this.userService.create(createAuthOrganizationDto);
			const organization = await this.organizationService.create({
				...createAuthOrganizationDto,
				userId: user?._id?.toString(),
			});

			user = await this.userService.findOne(user?._id?.toString());

			// Generate token for email confirmation
			const payload = { sub: user._id, email: user.email };

			const token = Token.generateToken(payload);

			// Email confirmation for the organization
			await this.mailHelper.sendConfirmAccountClient({
				to: [user.email],
				templateDatas: {
					organizationName:
						organization.organizationName ??
						organization.firstName + organization.lastName,
					token: token,
				},
			});

			// Log the registration
			try {
				await this.logService.create({
					ip,
					userId: user._id.toString(),
					firstName: organization.firstName,
					lastName: organization.lastName,
					level: LogLevelEnum.INFO,
					message: "User successfully registered",
					context: `AuthController > ${path}: `,
					metadata: { user, organization },
				});
			} catch (logError) {
				console.error(`Failed to create log in ${path}: `, logError);
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.CREATED,
				subject: "auth",
				data: {
					user,
					organization,
				},
			});
		} catch (error) {
			console.error(`AuthController > ${path} : `, error);

			if (
				error.message.includes("E11000 duplicate key error collection")
			) {
				let errorMessage = "An account already exists";

				if (error.message.includes("email_1")) {
					errorMessage = "An account with this email already exists";
				} else if (error.message.includes("phone_1")) {
					errorMessage =
						"An account with this phone number already exists";
				}

				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.CONFLICT,
					subject: "auth",
					error: errorMessage,
				});
			} else if (error.message === "Phone number is required") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.UNPROCESSABLE_ENTITY,
					subject: "auth",
					error: "Phone number is required",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while creating the account",
			});
		}
	}

	/**
	 * Sign in an user
	 * @param loginUserDto : LoginUserDto
	 * @param res : Response
	 * @returns : Response
	 */
	@ApiOperation({ summary: "Sign in an user" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The user has been successfully authenticated.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid input data.",
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Not Found - User not found.",
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
	})
	@Post("login")
	async login(
		@Body() loginUserDto: LoginUserDto,
		@Res() res: Response,
		@Ip() ip: string,
	) {
		const path = "login";
		const method = "Post";

		try {
			// Find user
			const user = await this.userService.findWhere({
				where: {
					email: loginUserDto.email,
				},
				find: "+password",
			});

			if (!user || user.length === 0) {
				throw new Error("User not found");
			}

			// Compare password
			const comparePassword = await Hash.hashCompareData(
				loginUserDto.password,
				user[0].password,
			);

			if (!comparePassword) {
				throw new Error("Invalid credentials");
			}

			// Find client
			const client = await this.clientService.findWhere({
				where: {
					userId: user[0]._id.toString(),
				},
			});

			if (!client || client.length === 0) {
				throw new Error("Client not found");
			}

			// Check user status
			if (user[0].status.includes(UserStatusEnum.NOT_VERIFIED)) {
				const payload = {
					sub: user[0]._id,
					email: user[0].email,
					type: TokenTypeEnum.CONFIRMATION_ACCOUNT,
				};
				const tokenConfirmation = Token.generateToken(payload);

				await this.mailHelper.sendConfirmAccountClient({
					to: [user[0].email],
					templateDatas: {
						firstName: client[0].firstName,
						token: tokenConfirmation,
					},
				});

				throw new Error("Invalid token");
			}

			if (
				user[0].status.some((status) =>
					[UserStatusEnum.BANNED, UserStatusEnum.SUSPENDED].includes(
						status,
					),
				)
			) {
				throw new Error("User suspended or banned");
			}

			// Generate tokens
			const payload_token = { sub: user[0]._id, email: user[0].email };

			const accessToken = Token.generateAccessToken({
				...payload_token,
				type: TokenTypeEnum.ACCESS,
			});
			const refreshToken = Token.generateRefreshToken({
				...payload_token,
				type: TokenTypeEnum.REFRESH,
			});

			// Log the login
			try {
				await this.logService.create({
					ip,
					userId: user[0]._id.toString(),
					firstName: client[0].firstName,
					lastName: client[0].lastName,
					level: LogLevelEnum.INFO,
					message: "User successfully registered",
					context: `AuthController > ${path}: `,
					metadata: { user, client },
				});
			} catch (logError) {
				console.error(`Failed to create log in ${path}: `, logError);
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: "auth",
				data: {
					access_token: accessToken,
					refresh_token: refreshToken,
				},
			});
		} catch (error) {
			console.error(`AuthController > ${path} : `, error);

			if (error.message === "User not found") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.NOT_FOUND,
					subject: "auth",
					error: "User not found",
				});
			} else if (error.message === "Invalid credentials") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.UNAUTHORIZED,
					subject: "auth",
					error: "Invalid credentials",
				});
			} else if (error.message === "User suspended or banned") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.FORBIDDEN,
					subject: "auth",
					error: "User suspended or banned",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while logging in",
			});
		}
	}

	/**
	 * Confirm user account
	 * @param token : string
	 * @param res : Response
	 * @returns : Response
	 */
	@ApiOperation({ summary: "Confirm user account" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The user account has been successfully verified.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid token.",
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Not Found - User not found.",
	})
	@ApiResponse({
		status: HttpStatus.GONE,
		description: "Gone - Token expired.",
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
	})
	@Get("confirm/:token")
	async confirm(
		@Param("token") token: string,
		@Res() res: Response,
		@Ip() ip: string,
	) {
		const path = "confirm";
		const method = "Get";

		try {
			// Verify token
			const verifyToken = Token.verifyToken(
				token,
				TokenTypeEnum.CONFIRMATION_ACCOUNT,
			);

			if (!verifyToken) {
				throw new Error("Invalid token");
			}

			// Get payload
			const payload = Token.getPayload(token);

			if (!payload) {
				throw new Error("Invalid token");
			}

			// Find user
			const user = await this.userService.findWhere({
				where: {
					_id: payload.sub.toString(),
					email: payload.email,
				},
			});

			if (!user || user.length === 0) {
				throw new Error("User not found");
			}

			if (!user[0].status.includes(UserStatusEnum.NOT_VERIFIED)) {
				throw new Error("Invalid token");
			}

			// Find client
			const client = await this.clientService.findWhere({
				where: {
					userId: user[0]._id.toString(),
				},
			});

			if (!client || client.length === 0) {
				throw new Error("Client not found");
			}

			// Check if token is expired
			const isExpired = Token.isTokenExpired(token);

			if (isExpired) {
				const newToken = await Token.generateToken({
					id: user[0]._id,
					email: user[0].email,
				});

				// Email confirmation for the client
				await this.mailHelper.sendConfirmAccountClient({
					to: [user[0].email],
					templateDatas: {
						firstName: client[0].firstName,
						token: newToken,
					},
				});

				throw new Error("Token expired");
			}

			// Update user status
			await this.userService.update(user[0].id, {
				status: [UserStatusEnum.ACTIVE],
			});

			// Log the confirmation
			try {
				await this.logService.create({
					ip,
					userId: user[0]._id.toString(),
					firstName: client[0].firstName,
					lastName: client[0].lastName,
					level: LogLevelEnum.INFO,
					message: "User successfully confirmed account",
					context: `AuthController > ${path}: `,
					metadata: { user, client },
				});
			} catch (logError) {
				console.error(`Failed to create log in ${path}: `, logError);
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.NO_CONTENT,
				subject: "auth",
				data: {},
			});
		} catch (error) {
			console.error(`AuthController > ${path} : `, error);

			if (
				error.message === "User not found" ||
				error.message === "Client not found"
			) {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.NOT_FOUND,
					subject: "auth",
					error: error.message,
				});
			} else if (error.message === "Invalid token") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.BAD_REQUEST,
					subject: "auth",
					error: "Invalid token",
				});
			} else if (error.message === "Token expired") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.GONE,
					subject: "auth",
					error: "Token expired",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while confirming the account",
			});
		}
	}

	/**
	 * Regenerate access token using refresh token
	 * @param refreshTokenDto : RefreshTokenDto
	 * @param res : Response
	 * @returns : Response
	 */
	@ApiOperation({ summary: "Regenerate access token using refresh token" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Access token successfully regenerated.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid refresh token.",
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "Unauthorized - Refresh token is expired or invalid.",
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
	})
	@Post("refresh-token")
	async refreshToken(
		@Body() refreshTokenDto: RefreshTokenDto,
		@Res() res: Response,
	) {
		const { refreshToken } = refreshTokenDto;
		const path = "refresh-token";
		const method = "Post";

		try {
			// Verify token
			const decoded = Token.verifyToken(
				refreshToken,
				TokenTypeEnum.REFRESH,
			);

			if (!decoded) {
				throw new Error("Invalid token");
			}

			// Find user
			const user = await this.userService.findOne(decoded.sub.toString());

			if (!user) {
				throw new Error("User not found");
			}

			// Check if token is expired
			const isExpired = Token.isTokenExpired(refreshToken);

			if (isExpired) {
				throw new Error("Invalid or expired refresh token");
			}

			// Generate new access token
			const newAccessToken = Token.generateAccessToken({
				sub: user._id,
				email: user.email,
			});

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: "auth",
				data: { access_token: newAccessToken },
			});
		} catch (error) {
			console.error(`AuthController > ${path} : `, error);

			if (error.message === "User not found") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.BAD_REQUEST,
					subject: "auth",
					error: "User not found",
				});
			} else if (error.message === "Expired refresh token") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.UNAUTHORIZED,
					subject: "auth",
					error: "Expired refresh token",
				});
			} else if (error.message === "Invalid token") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.BAD_REQUEST,
					subject: "auth",
					error: "Invalid token",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while confirming the account",
			});
		}
	}

	/**
	 * Reset or init password
	 * @param resetPasswordDto : ResetPasswordDto
	 * @param res : Response
	 * @returns : Response
	 */
	@ApiOperation({ summary: "Reset or init password" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Password successfully reset or initialized.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid token or invalid input data.",
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "Unauthorized - Invalid or expired token.",
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
	})
	@Put("reset-password")
	async resetPassword(
		@Body() resetPasswordDto: ResetPasswordDto,
		@Res() res: Response,
		@Ip() ip: string,
	) {
		const { token, newPassword } = resetPasswordDto;
		const path = "reset-password";
		const method = "Post";

		try {
			// Verify token
			const decoded = Token.verifyToken(token);

			if (!decoded) {
				throw new Error("Invalid token");
			}

			// Find user
			const user = await this.userService.findOne(decoded.sub.toString());

			if (!user) {
				throw new Error("User not found");
			}

			// Hash password
			user.password = await Hash.hashData(newPassword);

			// Update password
			const updatePassword = await this.userService.update(
				user._id.toString(),
				{ password: user.password },
			);

			if (!updatePassword) {
				throw new Error("The password could not be updated");
			}

			// Log the password reset
			try {
				const client = await this.clientService.findWhere({
					where: {
						userId: user[0]._id.toString(),
					},
				});

				if (!client || client.length === 0) {
					throw new Error("Client not found");
				}

				await this.logService.create({
					ip,
					userId: user[0]._id.toString(),
					firstName: client[0].firstName,
					lastName: client[0].lastName,
					level: LogLevelEnum.INFO,
					message: "User successfully registered",
					context: `AuthController > ${path}: `,
					metadata: { user, client },
				});
			} catch (logError) {
				console.error(`Failed to create log in ${path}: `, logError);
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: "auth",
				data: { message: "Password successfully reset or initialized" },
			});
		} catch (error) {
			console.error(`AuthController > ${path} : `, error);

			if (error.message === "User not found") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.UNAUTHORIZED,
					subject: "auth",
					error: "Invalid user associated with this token",
				});
			} else if (error.message === "Invalid token") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.BAD_REQUEST,
					subject: "auth",
					error: "Invalid token",
				});
			} else if (error.message === "The password could not be updated") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: "auth",
					error: "The password could not be updated",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while resetting the password",
			});
		}
	}

	/**
	 * Forgot Password
	 * @param forgotPasswordDto : ForgotPasswordDto
	 * @param res : Response
	 * @param ip : string
	 * @returns : Response
	 */
	@ApiOperation({ summary: "Forgot Password" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Password reset link sent to the user's email.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid email provided.",
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Not Found - User with this email does not exist.",
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
	})
	@Post("forgot-password")
	async forgotPassword(
		@Body() forgotPasswordDto: ForgotPasswordDto,
		@Res() res: Response,
		@Ip() ip: string,
	) {
		const { email } = forgotPasswordDto;
		const path = "forgot-password";
		const method = "Post";

		try {
			// Find user
			const user = await this.userService.findWhere({
				where: { email },
				limit: 1,
			});

			// Check if user exists
			if (user) {
				const payload = {
					sub: user[0]._id,
					email: user[0].email,
					type: TokenTypeEnum.RESET_PASSWORD,
				};
				const resetToken = Token.generateToken(payload);

				// Send email
				const sendEmail = await this.mailHelper.sendResetPasswordEmail({
					to: [user[0].email],
					templateDatas: {
						token: resetToken,
					},
				});

				if (!sendEmail) {
					throw new Error("Email could not be sent");
				}
			}

			// Log the password reset
			try {
				const client = await this.clientService.findWhere({
					where: {
						userId: user[0]._id.toString(),
					},
				});

				if (!client || client.length === 0) {
					throw new Error("Client not found");
				}

				await this.logService.create({
					ip,
					userId: user[0]._id.toString(),
					firstName: client[0].firstName,
					lastName: client[0].lastName,
					level: LogLevelEnum.INFO,
					message: "User successfully registered",
					context: `AuthController > ${path}: `,
					metadata: { user, client },
				});
			} catch (logError) {
				console.error(`Failed to create log in ${path}: `, logError);
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: "auth",
				data: {
					message:
						"If this account exist, the password reset link sent to the user's email",
				},
			});
		} catch (error) {
			console.error(`AuthController > ${path} : `, error);

			if (
				error.message.includes("E11000 duplicate key error collection")
			) {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.BAD_REQUEST,
					subject: "auth",
					error: "Duplicate key error",
				});
			} else if (error.message === "User not found") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.NOT_FOUND,
					subject: "auth",
					error: "User with this email does not exist",
				});
			} else if (error.message === "Email could not be sent") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: "auth",
					error: "Email could not be sent",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while processing your request",
			});
		}
	}
}
