import { Injectable, NestMiddleware, HttpStatus } from "@nestjs/common";
// import { Request, Response } from 'express';
import { Responses } from "@helpers/responses.helper";
import { Request, Response } from "express";
import { Token } from "@helpers/token.helper";
import { TokenTypeEnum } from "@enums/token-type.enum";
import { configService } from "@constants/env";
import { UsersService } from "@modules/users/users.service";
import { AuthService } from "@modules/auth/services/auth.service";
import { UserHelper } from "@modules/users/helpers/user.helper";
import { TeamsService } from "@modules/teams/teams.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private readonly usersService: UsersService,
		private readonly authService: AuthService,
		private readonly teamsService: TeamsService,
	) {}

	async use(req: Request, res: Response, next: () => void) {
		try {
			const accessToken = req.cookies.accessToken;

			if (!accessToken) {
				throw new Error("Missing access token");
			}

			// Verify token
			const verify = Token.verifyToken({
				token: accessToken,
				type: TokenTypeEnum.ACCESS,
				secretKey: configService.get<string>("ACCESS_JWT_SECRET"),
			});

			if (!verify) {
				throw new Error("Invalid token");
			}

			const payload = Token.getPayload(accessToken);

			if (!payload || !payload.sub) {
				throw new Error("Invalid token");
			}

			// Check if token is expired
			const isExpired = Token.isTokenExpired(accessToken);

			if (isExpired) {
				throw new Error("Expired access token");
			}

			// Find user
			const user = await this.usersService.findOneById({
				id: payload.sub.toString(),
			});

			if (!user) {
				throw new Error("User not found");
			}

			await this.authService.loginVerifStatusUser({
				user,
			});

			const userTypeData = await this.authService.loginVerifUserType({
				userType: user.userType,
				user,
			});

			const teams = await this.teamsService.findWhere({
				where: {
					userId: user._id.toString(),
				},
			});

			res["userInfos"] = {
				user,
				[UserHelper.getUserTypeString(user.userType)]: userTypeData,
				teams,
			};

			next();
		} catch (error) {
			// if (error.message === "User not found") {
			// 	return Responses.getResponse({
			// 		res,
			// 		path,
			// 		method,
			// 		status: HttpStatus.BAD_REQUEST,
			// 		subject: "auth",
			// 		error: "User not found.",
			// 	});
			// } else if (
			// 	["Expired refresh token", "jwt expired"].includes(error.message)
			// ) {
			// 	return Responses.getResponse({
			// 		res,
			// 		path,
			// 		method,
			// 		status: HttpStatus.UNAUTHORIZED,
			// 		subject: "auth",
			// 		error: "Expired refresh token.",
			// 	});
			// } else if (
			// 	["Invalid token", "invalid signature"].includes(error.message)
			// ) {
			// 	return Responses.getResponse({
			// 		res,
			// 		path,
			// 		method,
			// 		status: HttpStatus.BAD_REQUEST,
			// 		subject: "auth",
			// 		error: "Invalid token.",
			// 	});
			// }

			return Responses.getResponse({
				req,
				res,
				path: `(AuthMiddleware) - ${req.url} `,
				status: HttpStatus.UNAUTHORIZED,
				error: "Missing or invalid access token",
				errorDatas: error,
			});
		}
	}
}
