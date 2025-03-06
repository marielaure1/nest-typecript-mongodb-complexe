import { Injectable, Logger } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { configService } from "@constants/env";
import { TokenTypeEnum } from "@enums/token-type.enum";

let logger = new Logger();

/**
 * Utility class for handling JWT token generation, verification, and decoding.
 */
@Injectable()
export class Token {
	/**
	 * Generates a JWT token with a given payload and expiration time.
	 *
	 * @param {object} payload - The data to encode in the token.
	 * @param {string} [expiresIn="1h"] - Expiration time (default: "1h").
	 * @returns {string} - The generated JWT token.
	 * @throws {Error} - Throws an error if token generation fails.
	 */
	public static generateToken(payload: object, expiresIn: string = "1h") {
		try {
			const token = jwt.sign(
				payload,
				configService.get<string>("JWT_SECRET"),
				{
					expiresIn,
				},
			);

			return token;
		} catch (error: any) {
			logger.error("[ERROR] => class Token => generateToken");
			console.error("[ERROR_DATAS] :", error);
			throw new Error("An error occurred while generating the token.");
		}
	}

	/**
	 * Generates a short-lived access token.
	 *
	 * @param {object} payload - The data to encode in the access token.
	 * @returns {string} - The generated access token.
	 * @throws {Error} - Throws an error if access token generation fails.
	 */
	public static generateAccessToken(payload: object) {
		try {
			const accessToken = jwt.sign(
				payload,
				configService.get<string>("ACCESS_JWT_SECRET"),
				{
					expiresIn: "15m",
				},
			);

			return accessToken;
		} catch (error: any) {
			logger.error("[ERROR] => class Token => generateAccessToken");
			console.error("[ERROR_DATAS] :", error);
			throw new Error(
				"An error occurred while generating the access token.",
			);
		}
	}

	/**
	 * Generates a refresh token with an optional expiration date.
	 *
	 * @param {object} payload - The data to encode in the refresh token.
	 * @param {Date} [expiresAt] - The expiration date (default: 1 day).
	 * @returns {string} - The generated refresh token.
	 * @throws {Error} - Throws an error if refresh token generation fails.
	 */
	public static generateRefreshToken(payload: object, expiresAt?: Date) {
		try {
			const refreshToken = jwt.sign(
				payload,
				configService.get<string>("REFRESH_JWT_SECRET"),
				{
					expiresIn: expiresAt
						? Math.floor(
								(expiresAt.getTime() - Date.now()) / 1000,
							) + "s"
						: "1d",
				},
			);

			return refreshToken;
		} catch (error: any) {
			logger.error("[ERROR] => class Token => generateRefreshToken");
			console.error("[ERROR_DATAS] :", error);
			throw new Error(
				"An error occurred while generating the refresh token.",
			);
		}
	}

	/**
	 * Verifies a JWT token and optionally checks if it matches a specific token type.
	 *
	 * @param {object} options - Options for verifying the token.
	 * @param {string} options.token - The token to verify.
	 * @param {TokenTypeEnum} [options.type] - The expected token type.
	 * @param {string} [options.secretKey=configService.get<string>("")JWT_SECRET] - The secret key used for verification.
	 * @returns {boolean} - Returns `true` if the token is valid, `false` otherwise.
	 */
	public static verifyToken({
		token,
		type,
		secretKey = configService.get<string>("JWT_SECRET"),
	}: {
		token: string;
		type?: TokenTypeEnum;
		secretKey?: string;
	}) {
		const jwtVerified = jwt.verify(token, secretKey);

		if (!jwtVerified) {
			return false;
		}

		const payload = this.getPayload(token);

		if (type && payload && payload.type !== type) {
			return false;
		}

		return true;
	}

	/**
	 * Checks if a JWT token has expired.
	 *
	 * @param {string} token - The token to check.
	 * @returns {boolean} - Returns `true` if the token has expired, otherwise `false`.
	 * @throws {Error} - Throws an error if the token does not contain an expiration date.
	 */
	public static isTokenExpired(token: string) {
		try {
			const decodedToken = jwt.decode(token) as any;

			if (!decodedToken || !decodedToken.exp) {
				throw new Error("Token has no expiration date");
			}

			const isExpired = decodedToken.exp * 1000 < Date.now();
			return isExpired;
		} catch (error: any) {
			logger.error("[ERROR] => class Token => isTokenExpired");
			console.error("[ERROR_DATAS] :", error);
			throw new Error(
				"An error occurred while checking the token expiration.",
			);
		}
	}

	/**
	 * Extracts and returns the payload from a JWT token.
	 *
	 * @param {string} token - The token to decode.
	 * @returns {object} - The decoded payload.
	 * @throws {Error} - Throws an error if the token does not contain a payload.
	 */
	public static getPayload(token: string) {
		try {
			const payload = jwt.decode(token) as any;

			if (!payload) {
				throw new Error("Token has no payload");
			}

			return payload;
		} catch (error: any) {
			logger.error("[ERROR] => class Token => getPayload");
			console.error("[ERROR_DATAS] :", error);
			throw new Error(
				"An error occurred while getting the token payload.",
			);
		}
	}
}
