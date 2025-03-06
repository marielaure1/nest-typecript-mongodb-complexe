// Base
import { HttpStatus, Injectable } from "@nestjs/common";

// Dependencies
import { ClientSession } from "mongoose";
import type { Response, Request } from "express";

// Configs
import { settings } from "@constants/settings";
import { configService } from "@constants/env";

// Enums
import { TokenTypeEnum } from "@enums/token-type.enum";
import { UserTypeEnum } from "@enums/user-type.enum";
import { AuthTypeProviderEnum } from "@enums/auth-type-provider.enum";
import { UserStatusEnum } from "@enums/user-status.enum";

// Services
import { UsersService } from "@modules/users/users.service";
import { ClientsService } from "@modules/clients/clients.service";
// import { StaffsService } from "@modules/staffs/staffs.service";
import { EmployeesService } from "@modules/employees/employees.service";
import { RefreshTokenService } from "./refresh-token.service";

// Entities
import { UserDocument } from "@modules/users/entities/user.entity";
import { ClientDocument } from "@modules/clients/entities/client.entity";
import { EmployeeDocument } from "@modules/employees/entities/employee.entity";

// Helpers
import { Responses } from "@helpers/responses.helper";
import { Token } from "@helpers/token.helper";

/**
 * Parameters for creating or replacing a refresh token.
 */
interface CreateRefreshTokenParams {
	userId: string;
	refreshToken: string;
	session: ClientSession;
}

/**
 * Parameters for refreshing authentication tokens.
 */
interface RefreshTokensParams {
	oldToken: string;
	res: Response;
	user: UserDocument;
	session?: ClientSession;
}

/**
 * Parameters for logging out a user.
 */
interface LogoutParams {
	refreshToken: string;
	session?: ClientSession;
}

/**
 * Parameters for checking if a user already exists.
 */
interface RegisterUserExistParams {
	session: ClientSession;
	email: string;
	typePovider;
	res: Response;
	req: Request;
}

/**
 * Parameters for registering a user type.
 */
interface RegisterCreateUserTypeParams {
	userType: UserTypeEnum;
	userId: string;
	res: Response;
	req: Request;
	session: ClientSession;
}

/**
 * Parameters for handling response token cookies.
 */
interface ResponseTokenCookiesParams {
	res: Response;
	user: UserDocument;
	googleAccessToken?: string;
	expiresAt?: Date;
	session: ClientSession;
}

/**
 * Parameters for verifying a user's type during login.
 */
interface LoginVerifUserTypeParams {
	userType: UserTypeEnum;
	user: UserDocument;
	session?: ClientSession;
}

/**
 * Parameters for verifying a user's status during login.
 */
interface LoginVerifStatusUserParams {
	user: UserDocument;
	session?: ClientSession;
}

@Injectable()
export class AuthService {
	constructor(
		private refreshTokensService: RefreshTokenService,
		private userService: UsersService,
		private readonly clientsService: ClientsService,
		private readonly employeesService: EmployeesService,
	) {}

	/**
	 * Creates or replaces a refresh token for a user.
	 *
	 * @param {CreateRefreshTokenParams} params - The parameters object.
	 */
	async createRefreshToken({
		userId,
		refreshToken,
		session,
	}: CreateRefreshTokenParams) {
		// Vérifie si un token existe déjà pour cet utilisateur
		const existingToken = await this.refreshTokensService.findOne({
			filter: { userId, isRevoked: false },
		});

		if (existingToken) {
			// Révoquer l'ancien token
			await this.refreshTokensService.update({
				id: existingToken._id.toString(),
				updateDto: {
					isRevoked: true,
				},
				session,
			});
		}

		const payload = Token.getPayload(refreshToken);

		// Sauvegarder le nouveau token
		const newRefreshToken = await this.refreshTokensService.create({
			createDto: {
				userId,
				token: refreshToken,
				expiresAt: payload.exp,
				isRevoked: false,
			},
			session,
		});

		return { refreshToken: newRefreshToken };
	}

	/**
	 * Refreshes the authentication tokens and updates the response cookies.
	 *
	 * @param {RefreshTokensParams} params - The parameters object.
	 */
	async refreshTokens({ oldToken, res, user, session }: RefreshTokensParams) {
		const oldPayload = Token.getPayload(oldToken);

		await this.responseTokenCookies({
			res,
			user,
			expiresAt: oldPayload.exp,
			session,
		});
	}

	/**
	 * Logs out the user by revoking the provided refresh token.
	 *
	 * @param {LogoutParams} params - The parameters object.
	 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
	 */
	async revokeRefreshToken({
		refreshToken,
		session,
	}: LogoutParams): Promise<void> {
		const token = await this.refreshTokensService.findOne({
			filter: { token: refreshToken },
		});

		if (token) {
			await this.refreshTokensService.update({
				id: token._id.toString(),
				updateDto: {
					isRevoked: true,
				},
				session,
			});
		}
	}

	/**
	 * Checks if a user with the provided email already exists and handles the response accordingly.
	 *
	 * @param {RegisterUserExistParams} params - The parameters object.
	 */
	async registerUserExist({
		session,
		email,
		typePovider,
		res,
		req,
	}: RegisterUserExistParams) {
		const isUserExist = await this.userService.findWhere({
			where: {
				email,
			},
			session,
		});

		if (isUserExist && isUserExist.length > 0) {
			if (typePovider === AuthTypeProviderEnum.GOOGLE) {
				return res.redirect(
					configService.get<string>("FRONTEND_URL") +
						"/auth/register?success=false",
				);
			} else {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.CONFLICT,
					error: "An account with this email already exists.",
				});
			}
		}
	}

	/**
	 * Registers a user type and creates associated records.
	 *
	 * @param {RegisterCreateUserTypeParams} params - The parameters object.
	 */
	async registerCreateUserType({
		userType,
		userId,
		session,
	}: RegisterCreateUserTypeParams) {
		let employee: EmployeeDocument;

		const client = await this.clientsService.create({
			createDto: {
				userId,
			},
			session,
		});

		if (userType == UserTypeEnum.EMPLOYEE) {
			employee = await this.employeesService.create({
				createDto: {
					userId,
				},
				session,
			});
		}

		return {
			client,
			employee,
		};
	}

	/**
	 * Handles setting authentication cookies.
	 *
	 * @param {ResponseTokenCookiesParams} params - The parameters object.
	 */
	async responseTokenCookies({
		res,
		user,
		googleAccessToken,
		expiresAt,
		session,
	}: ResponseTokenCookiesParams) {
		const payloadToken = {
			sub: user._id,
			email: user.email,
			userType: user.userType,
		};

		const accessToken = Token.generateAccessToken({
			...payloadToken,
			type: TokenTypeEnum.ACCESS,
		});
		const refreshToken = Token.generateRefreshToken({
			...payloadToken,
			type: TokenTypeEnum.REFRESH,
			expiresAt,
		});

		await this.createRefreshToken({
			userId: user._id.toString(),
			refreshToken,
			session,
		});

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: settings.isProd,
			sameSite: "strict",
			path: "/",
		});

		if (googleAccessToken) {
			res.cookie("googleAccessToken", googleAccessToken, {
				httpOnly: true,
				secure: settings.isProd,
				sameSite: "strict",
				path: "/",
			});
		}

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: settings.isProd,
			sameSite: "strict",
			path: "/",
		});
	}

	/**
	 * Verifies a user's type during login.
	 *
	 * @param {LoginVerifUserTypeParams} params - The parameters object.
	 */
	async loginVerifUserType({
		userType,
		user,
		session,
	}: LoginVerifUserTypeParams) {
		let userInfo: // | StaffDocument
		EmployeeDocument | ClientDocument = null;

		if (userType == UserTypeEnum.EMPLOYEE) {
			userInfo = await this.employeesService.findOne({
				filter: {
					userId: user._id.toString(),
				},
				session,
			});

			if (!userInfo) {
				throw new Error("Employee not found");
			}
		} else if (userType == UserTypeEnum.CLIENT) {
			userInfo = await this.clientsService.findOne({
				filter: {
					userId: user._id.toString(),
				},
				session,
			});

			if (!userInfo) {
				throw new Error("Client not found");
			}
		} else {
			throw new Error("User not found");
		}

		return userInfo;
	}

	/**
	 * Verifies a user's status during login.
	 *
	 * @param {LoginVerifStatusUserParams} params - The parameters object.
	 */
	async loginVerifStatusUser({ user, session }: LoginVerifStatusUserParams) {
		if (
			user.status === UserStatusEnum.SUSPENDED ||
			user.status === UserStatusEnum.BANNED
		) {
			throw new Error("User suspended or banned");
		}

		// TODO: renvoyer le mail automatiquement ou bouton renvoyer coté front
		if (!user.isVerified) {
			throw new Error("Account not verified");
		}

		await this.userService.update({
			id: user._id.toString(),
			updateDto: {
				isActive: true,
				lastConnection: new Date(),
			},
			session,
		});
	}
}
