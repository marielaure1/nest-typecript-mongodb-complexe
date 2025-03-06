// Base
import {
	Controller,
	Get,
	Req,
	Res,
	UseInterceptors,
	Query,
	Logger,
} from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";

// Dependencies
import type { Request } from "express";
import { Connection } from "mongoose";

// CONFIGS
import { configService } from "@constants/env";

// Enums
import { UserTypeEnum } from "@enums/user-type.enum";
import { AuthActionEnum } from "@modules/auth/enums/auth-action.enum";

// Helpers
import { CryptoHelper } from "@helpers/crypto.helper";

// Interceptors
import { LogInterceptor } from "@interceptors/log.interceptor";

// Services
import { AuthService } from "@modules/auth/services/auth.service";
import { UsersService } from "@modules/users/users.service";
import { GoogleAuthService } from "@providers/google/google.service";

let logger = new Logger();

/**
 * Controller for handling authentication-related google operations.
 */
@ApiTags("auth")
@Controller("auth/google")
@UseInterceptors(LogInterceptor)
export class AuthGoogleController {
	/**
	 * Creates an instance of AuthController.
	 *
	 * @param {UsersService} userService - The service handling user operations.
	 * @param {AuthService} authService - The service handling authentication logic.
	 * @param {Connection} connection - The database connection instance.
	 * @param {GoogleAuthService} googleAuthService - The service handling google authentication logic.
	 */
	constructor(
		private readonly userService: UsersService,
		private readonly authService: AuthService,
		private readonly connection: Connection,
		private readonly googleAuthService: GoogleAuthService,
	) {}

	/**
	 * Action for Google Authentication.
	 * @param action Type of auth action: register or login.
	 * @param userType User type : employee, client or staff
	 * @param res - The response object used to send the result back to the client.
	 */
	@ApiOperation({
		summary:
			"[CALL WITH LINK] Google Authorisation for register or login an user",
	})
	@ApiQuery({
		name: "action",
		enum: AuthActionEnum,
	})
	@ApiQuery({
		name: "userType",
		enum: UserTypeEnum,
	})
	@Get()
	async action(
		@Query("action") action: AuthActionEnum,
		@Query("userType") userType: UserTypeEnum,
		@Res() res: any,
	) {
		const url = this.googleAuthService.generateAuthUrl({
			action,
			userType,
		});
		res.redirect(url);
	}

	/**
	 * Google callback for register or login the google user.
	 * @param code Google code
	 * @param state State with action and userType.
	 * @param req - The request object that holds metadata like headers for tracing and session handling.
	 * @param res - The response object used to send the result back to the client.
	 * @returns
	 */
	@ApiOperation({
		summary: "[DO NOT CALL] Register or Login an user with Google",
	})
	@Get("callback")
	async callback(
		@Query("code") code: string,
		@Query("state") state: string,
		@Req() req: Request,
		@Res() res: any,
	) {
		const session = await this.connection.startSession();
		session.startTransaction();

		const requestId =
			req.headers["x-request-id"] || CryptoHelper.generateRequestId();
		const traceId =
			req.headers["x-trace-id"] || CryptoHelper.generateTraceId();

		try {
			const tokens = await this.googleAuthService.getTokens(code);
			const {
				action,
				userType,
			}: { action: AuthActionEnum; userType: UserTypeEnum } =
				JSON.parse(state);
			const userInfo = await this.googleAuthService.getUserInfo(
				tokens.id_token,
			);

			let user = await this.userService.findOne({
				filter: {
					email: userInfo.email,
				},
				session,
			});

			if (action == AuthActionEnum.REGISTER) {
				if (user) {
					// REGISTER : User already exist
					return res.redirect(
						`${configService.get<string>("FRONTEND_URL")}/${userType}/auth/register?success=false&alreadyExist=true`,
					);
				} else {
					// REGISTER : User not exist
					user = await this.userService.create({
						createDto: {
							email: userInfo.email,
							firstName: userInfo.given_name,
							lastName: userInfo.family_name,
							isVerified: true,
							userType,
						},
						session,
					});

					const userId = user._id?.toString();

					await this.authService.registerCreateUserType({
						userType,
						userId,
						res,
						req,
						session,
					});

					await this.userService.sendConfirmAccountUser({
						user,
					});
				}
			} else if (action == AuthActionEnum.LOGIN) {
				if (!user || user.userType != userType) {
					// LOGIN : User not exist
					return res.redirect(
						`${configService.get<string>("FRONTEND_URL")}/${userType}/auth/login?success=false&notFound=true`,
					);
				} else {
					// LOGIN : User exist
					await this.authService.loginVerifStatusUser({
						user,
						session,
					});
				}
			} else {
				throw new Error("Google action not found");
			}

			await this.authService.responseTokenCookies({
				res,
				user,
				googleAccessToken: tokens.access_token,
				session,
			});

			// Commit the transaction
			await session.commitTransaction();

			return res.redirect(
				`${configService.get<string>("FRONTEND_URL")}/${userType}`,
			);
		} catch (error: any) {
			// Abort the transaction
			await session.abortTransaction();

			logger.error(
				`[ERROR] => AuthModule > AuthController > Google Callback : `,
				error,
			);

			if (error.message === "User suspended or banned") {
				return res.redirect(
					configService.get<string>("FRONTEND_URL") +
						"/auth/register?success=false&&banned-or-suspended=true",
				);
			}

			return res.redirect(
				`${configService.get<string>("FRONTEND_URL")}/auth/login?success=false`,
			);
		} finally {
			session.endSession();
		}
	}
}
