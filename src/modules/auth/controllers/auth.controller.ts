// Base
import {
	Body,
	Controller,
	HttpStatus,
	Ip,
	Logger,
	Param,
	Post,
	Req,
	Res,
	UseInterceptors,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";

// Configs
import { configService } from "@constants/env";

// Dependencies
import type { Response, Request } from "express";
import { Connection } from "mongoose";
import axios from "axios";

// Helper
import { Responses } from "@helpers/responses.helper";
import { Hash } from "@helpers/hash.helper";
import { Token } from "@helpers/token.helper";
import { StringHelper } from "@helpers/string.helper";
import { LogsHelper } from "@modules/logs/helpers/logs.helper";

// Service
import { UsersService } from "@modules/users/users.service";
import { AuthService } from "@modules/auth/services/auth.service";

// Enums
import { UserStatusEnum } from "@enums/user-status.enum";
import { TokenTypeEnum } from "@enums/token-type.enum";
import { AuthTypeProviderEnum } from "@enums/auth-type-provider.enum";
import { UserTypeEnum } from "@enums/user-type.enum";

// Dtos
import { LoginUserDto } from "@modules/auth/dto/login-user.dto";
import { CreateUserDto } from "@modules/users/dto/create-user.dto";

// Interceptor
import { LogInterceptor } from "@interceptors/log.interceptor";
import { NodeEnvEnum } from "@enums/configs/node-env.enum";
import { UserHelper } from "@modules/users/helpers/user.helper";

let logger = new Logger();

/**
 * Controller for handling authentication-related operations.
 */
@ApiTags("auth")
@Controller("auth")
@UseInterceptors(LogInterceptor)
export class AuthController {
	/**
	 * Creates an instance of AuthController.
	 *
	 * @param {UsersService} userService - The service handling user operations.
	 * @param {AuthService} authService - The service handling authentication logic.
	 * @param {Connection} connection - The database connection instance.
	 * @param {LogsHelper} logsHelper - The helper service for logging.
	 */
	constructor(
		private readonly userService: UsersService,
		private readonly authService: AuthService,
		private readonly connection: Connection,
		private readonly logsHelper: LogsHelper,
	) {}

	/**
	 * Registers a new user. Handles the creation of user, client, or employee entities based on user type within a transaction.
	 *
	 * @param createUserDto - DTO containing user's email, password, or Google access token.
	 * @param res - Response object for sending the result back to the client.
	 * @param req - Request object holding metadata like headers for tracing and session handling.
	 * @param ip - Client's IP address for logging and security purposes.
	 * @param userType - Specifies if the user is a client or employee.
	 * @returns A JSON response containing the user information or an error message if the process fails.
	 */
	@ApiOperation({ summary: "Register a new user" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The user has been successfully registered.",
		content: {
			"application/json": {
				example: {
					status: 201,
					success: true,
					data: {
						userInfos: {
							user: {
								id: "123",
								email: "user@example.com",
								status: "AVAILABLE",
								isActive: true,
								isVerified: false,
								lastConnection: null,
								role: "CLIENT",
							},
							client: {
								id: "456",
								firstName: null,
								lastName: null,
								phone: null,
								address1: null,
								address2: null,
								postalstatus: null,
								city: null,
								country: null,
								notificationEmail: true,
								notificationSms: false,
							},
						},
					},
					message: "Registration completed successfully.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Invalid input data.",
		content: {
			"application/json": {
				example: {
					fieldsErrors: [
						{
							field: "email",
							errors: [
								"email must match /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/ regular expression",
							],
						},
					],
					error: "Invalid credentials",
					status: 400,
					success: false,
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: "Email already exists.",
		content: {
			"application/json": {
				example: {
					status: 409,
					success: false,
					message: "Auth conflict",
					error: "An account with this email already exists.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal server error.",
		content: {
			"application/json": {
				example: {
					status: 500,
					success: false,
					error: "An error occurred while creating the account.",
				},
			},
		},
	})
	@ApiParam({
		name: "userType",
		type: String,
		description:
			"Specifies the type of user to be created (client or employee).",
		required: true,
		example: "client",
	})
	@Post("register/:userType")
	async registerUser(
		@Body() createUserDto: CreateUserDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
		@Param("userType") userType: UserTypeEnum,
	) {
		const session = await this.connection.startSession();
		let transactionActive = false;

		try {
			session.startTransaction();
			transactionActive = true;

			// Vérifier si l'utilisateur existe déjà
			await this.authService.registerUserExist({
				email: createUserDto.email,
				typePovider: AuthTypeProviderEnum.EMAIL,
				res,
				req,
				session,
			});

			// Hasher le mot de passe
			createUserDto.password = await Hash.hashData(
				createUserDto.password,
			);

			// Définir le type d'utilisateur
			createUserDto.userType = userType;

			// Créer l'utilisateur
			const userWithPassword = await this.userService.create({
				createDto: createUserDto,
				session,
			});

			if (!userWithPassword) {
				throw new Error("Erreur lors de la création de l'utilisateur.");
			}

			const user = StringHelper.removePassword(userWithPassword);

			// Enregistrer les détails supplémentaires de l'utilisateur
			const userTypeCreated =
				await this.authService.registerCreateUserType({
					userType,
					userId: user._id.toString(),
					res,
					req,
					session,
				});

			// Envoyer l'email de confirmation
			await this.userService.sendConfirmAccountUser({ user });

			// Enregistrer les logs
			await this.logsHelper.logInfo({
				req,
				ip,
				userId: user._id.toString(),
				email: user.email,
				message: `${userTypeCreated.employee ? "Employee" : "Client"} confirmation email sent`,
				context: req.url,
				metadata: {
					[userTypeCreated.employee ? "employeeId" : "clientId"]:
						userTypeCreated.employee
							? userTypeCreated.employee._id.toString()
							: userTypeCreated.client._id.toString(),
				},
			});

			// Valider la transaction
			await session.commitTransaction();
			transactionActive = false;

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.CREATED,
				message: `${userTypeCreated.employee ? "Employee" : "Client"} registration completed successfully.`,
				data: {
					userInfos: {
						user,
						[userTypeCreated.employee ? "employee" : "client"]:
							userTypeCreated.employee
								? userTypeCreated.employee
								: userTypeCreated.client,
					},
				},
			});
		} catch (error: any) {
			if (transactionActive && session.inTransaction()) {
				await session.abortTransaction();
			}

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: "An error occurred while creating the account.",
				errorDatas: error,
			});
		} finally {
			session.endSession();
		}
	}

	/**
	 * Sign in a user.
	 *
	 * This endpoint allows a user to sign in by providing their email and password.
	 * The method handles user authentication, checks user status, and generates
	 * the necessary access and refresh tokens.
	 *
	 * @param loginUserDto - Data Transfer Object containing user's email and password.
	 * @param res - The response object used to return the result of the operation.
	 * @returns A JSON response containing access and refresh tokens, or an error message.
	 */
	@ApiOperation({ summary: "Sign in a user" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The user has been successfully authenticated.",
		content: {
			"application/json": {
				example: {
					status: 200,
					success: true,
					data: {
						userInfos: {
							user: {
								id: "123",
								email: "user@example.com",
								status: UserStatusEnum.AVAILABLE,
								isActive: true,
								isVerified: false,
								lastConnection: null,
							},
							client: {
								id: "456",
								firstName: null,
								lastName: null,
								phone: null,
								address1: null,
								address2: null,
								postalCode: null,
								city: null,
								country: null,
								notificationEmail: true,
								notificationSms: false,
							},
						},
						accessToken: "token",
					},
					message: "Login successfully.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Unauthorized - Invalid credentials.",
		content: {
			"application/json": {
				example: {
					status: 400,
					success: false,
					error: "Invalid credentials",
					fieldsErrors: [
						{
							field: "email",
							errors: [
								"email must match /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/ regular expression",
							],
						},
					],
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "Unauthorized - Invalid password.",
		content: {
			"application/json": {
				example: {
					status: 401,
					success: false,
					error: "Invalid password.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.FORBIDDEN,
		description: "User suspended or banned | Account not verified.",
		content: {
			"application/json": {
				examples: {
					accountNotVerified: {
						summary: "Account not verified",
						value: {
							status: 403,
							success: false,
							error: "Account not verified.",
						},
					},
					userSuspended: {
						summary: "User suspended or banned",
						value: {
							status: 403,
							success: false,
							error: "User suspended or banned.",
						},
					},
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Not Found - User not found.",
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
		description: "Internal Server Error - Something went wrong.",
		content: {
			"application/json": {
				example: {
					status: 500,
					success: false,
					error: "An error occurred while logging in.",
				},
			},
		},
	})
	@ApiParam({
		name: "userType",
		type: String,
		description: "Type of user (client or employee).",
		required: true,
		example: "client",
	})
	@Post("login/:userType")
	async login(
		@Body() loginUserDto: LoginUserDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
		@Param("userType") userType: UserTypeEnum,
	) {
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Find user
			const user = await this.userService.findOne({
				filter: {
					email: loginUserDto.email,
				},
				session,
				find: "+password",
			});

			if (!user || user.userType !== userType) {
				throw new Error("User not found");
			}

			// Compare password
			const comparePassword = await Hash.hashCompareData(
				loginUserDto.password,
				user.password,
			);

			if (!comparePassword) {
				throw new Error("Invalid password");
			}

			await this.authService.loginVerifStatusUser({
				user,
				session,
			});

			await this.authService.responseTokenCookies({
				res,
				user,
				session,
			});

			const userWithoutPassword = StringHelper.removePassword(user);

			const userTypeData = await this.authService.loginVerifUserType({
				userType,
				user,
				session,
			});

			await session.commitTransaction();

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				message: "Login successfully.",
				data: {
					userInfos: {
						user: userWithoutPassword,
						[UserHelper.getUserTypeString(user.userType)]:
							userTypeData,
					},
				},
			});
		} catch (error: any) {
			await session.abortTransaction();

			if (
				error.message === "User not found" ||
				error.message === "Client not found" ||
				error.message === "Staff not found" ||
				error.message === "Employee not found"
			) {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: "User not found.",
					errorDatas: error,
				});
			} else if (error.message === "Invalid password") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.UNAUTHORIZED,
					error: "Invalid password.",
					errorDatas: error,
				});
			} else if (error.message === "Account not verified") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.FORBIDDEN,
					error: "Account not verified.",
					errorDatas: error,
				});
			} else if (error.message === "User suspended or banned") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.FORBIDDEN,
					error: "User suspended or banned.",
					errorDatas: error,
				});
			}

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: "An error occurred while logging in.",
				errorDatas: error,
			});
		} finally {
			session.endSession();
		}
	}

	/**
	 * Regenerate access token using refresh token
	 * @param refreshTokenDto : RefreshTokenDto
	 * @param res : Response
	 * @returns : Response
	 */
	@ApiBearerAuth(TokenTypeEnum.REFRESH)
	@ApiOperation({
		summary: "Regenerate access token using refresh token",
		description:
			"This endpoint requires a REFRESH token in the Authorization header.",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Access token successfully regenerated.",
		content: {
			"application/json": {
				example: {
					status: 200,
					success: true,
					accessToken: "token",
					message: "AccessToken refreshed successfully.",
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
		status: HttpStatus.UNAUTHORIZED,
		description: "Expired or invalid refresh token.",
		content: {
			"application/json": {
				example: {
					status: 401,
					success: false,
					error: "Expired refresh token.",
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
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "An error occurred while regenerating the access token.",
		content: {
			"application/json": {
				example: {
					status: 500,
					success: false,
					error: "An error occurred while regenerating the access token.",
				},
			},
		},
	})
	@Post("refresh-tokens")
	async refreshTokens(@Req() req: Request, @Res() res: Response) {
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			const refreshToken = req.cookies.refreshToken;

			// Verify token
			const verify = Token.verifyToken({
				token: refreshToken,
				type: TokenTypeEnum.REFRESH,
				secretKey: configService.get<string>("REFRESH_JWT_SECRET"),
			});

			if (!verify) {
				throw new Error("Invalid token");
			}

			const payload = Token.getPayload(refreshToken);

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

			// Check if token is expired
			const isExpired = Token.isTokenExpired(refreshToken);

			if (isExpired) {
				throw new Error("Expired refresh token");
			}

			// Generate new access token
			await this.authService.refreshTokens({
				oldToken: refreshToken,
				user,
				res,
				session,
			});

			await session.commitTransaction();

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				message: "AccessToken refreshed successfully.",
			});
		} catch (error: any) {
			await session.abortTransaction();

			if (error.message === "User not found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.BAD_REQUEST,
					error: "User not found.",
					errorDatas: error,
				});
			} else if (
				["Expired refresh token", "jwt expired"].includes(error.message)
			) {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.UNAUTHORIZED,
					error: "Expired refresh token.",
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
			}

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: "An error occurred while regenerating the access token.",
				errorDatas: error,
			});
		} finally {
			session.endSession();
		}
	}

	/**
	 * Log out a user.
	 *
	 * This endpoint allows a user to log out by invalidating their refresh token.
	 * It also clears the refresh token cookie from the user's browser to ensure
	 * that they are fully logged out.
	 *
	 * @param req - The request object containing cookies with the refresh token.
	 * @param res - The response object used to return the result of the operation.
	 * @returns A JSON response confirming the logout operation or an error message.
	 */
	@ApiOperation({ summary: "Log out a user" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The user has been successfully logged out.",
		content: {
			"application/json": {
				example: {
					status: 200,
					success: true,
					message: "Logout successful.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Missing refresh token.",
		content: {
			"application/json": {
				example: {
					status: 400,
					success: false,
					error: "Refresh token not provided.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
		content: {
			"application/json": {
				example: {
					status: 500,
					success: false,
					error: "An error occurred while logging out.",
				},
			},
		},
	})
	@Post("logout")
	async logout(@Req() req: Request, @Res() res: Response, @Ip() ip: string) {
		try {
			// logout access token, refresh token
			const refreshToken = req.cookies.refreshToken;

			if (!refreshToken) {
				throw new Error("Refresh token not provided");
			}

			// Revoke accessToken
			await this.authService.revokeRefreshToken(refreshToken);

			// Google : revoke token
			const googleAccessToken = req.cookies.googleAccessToken;

			if (googleAccessToken) {
				await axios.post(
					`https://oauth2.googleapis.com/revoke?token=${googleAccessToken}`,
				);
			}

			// Apple : revoke token
			res.clearCookie("accessToken", {
				httpOnly: true,
				secure: configService.get<string>("MODE") === NodeEnvEnum.PROD,
				sameSite: "strict",
				path: "/",
			});

			res.clearCookie("refreshToken", {
				httpOnly: true,
				secure: configService.get<string>("MODE") === NodeEnvEnum.PROD,
				sameSite: "strict",
				path: "/",
			});

			if (googleAccessToken) {
				res.clearCookie("googleAccessToken", {
					httpOnly: true,
					secure:
						configService.get<string>("MODE") === NodeEnvEnum.PROD,
					sameSite: "strict",
					path: "/",
				});
			}

			await this.logsHelper.logInfo({
				req,
				ip,
				message: `Logout successful`,
				context: refreshToken.url,
				metadata: {
					refreshToken: refreshToken.slice(0, 10) + "***",
				},
			});

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				message: "Logout successful.",
			});
		} catch (error: any) {
			if (error.message === "Refresh token not provided") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.BAD_REQUEST,
					error: "Refresh token not provided.",
					errorDatas: error,
				});
			}

			/// Cannot revoke google token
			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while logging out.",
				errorDatas: error,
			});
		}
	}

	// TODO[]:  token vers url pro pour creer son compte pro

	// TODO: two factor auth
}
