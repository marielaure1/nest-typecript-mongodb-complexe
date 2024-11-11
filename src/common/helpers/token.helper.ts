import { settings } from "@constants/settings";
import { TokenTypeEnum } from "@enums/token-type.enum";
import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class Token {
	public static generateToken(payload: object, expiresIn: string = "1h") {
		try {
			const token = jwt.sign(payload, settings.JWT_SECRET, {
				expiresIn,
			});

			return token;
		} catch (error) {
			console.log(error);
			throw new Error("An error occurred while generating the token");
		}
	}

	public static generateAccessToken(payload: object) {
		try {
			const accessToken = jwt.sign(payload, settings.ACCESS_JWT_SECRET, {
				expiresIn: "15m",
			});

			return accessToken;
		} catch (error) {
			console.log(error);
			throw new Error(
				"An error occurred while generating the access token",
			);
		}
	}

	public static generateRefreshToken(payload: object) {
		try {
			const refreshToken = jwt.sign(
				payload,
				settings.REFRESH_JWT_SECRET,
				{
					expiresIn: "7d",
				},
			);

			return refreshToken;
		} catch (error) {
			console.log(error);
			throw new Error(
				"An error occurred while generating the refresh token",
			);
		}
	}

	public static verifyToken(token: string, type?: TokenTypeEnum) {
		try {
			// Utilise la méthode jwt.verify pour vérifier le token
			const verified = jwt.verify(token, this.getSecret(type));

			// Récupère et vérifie le type de payload
			const payload = this.getPayload(token);

			if (payload && payload.type !== type) {
				throw new Error("Token type does not match");
			}

			return verified;
		} catch (error) {
			// Gestion des erreurs spécifiques JWT
			if (error.name === "TokenExpiredError") {
				throw new Error("TokenExpiredError: The token has expired");
			} else if (error.name === "JsonWebTokenError") {
				throw new Error("JsonWebTokenError: Invalid token");
			} else {
				throw new Error("Token validation error");
			}
		}
	}

	public static isTokenExpired(token: string) {
		try {
			const decodedToken = jwt.decode(token) as any;

			console.log(decodedToken);

			if (!decodedToken || !decodedToken.exp) {
				throw new Error("Token has no expiration date");
			}

			const isExpired = decodedToken.exp * 1000 < Date.now();
			return isExpired;
		} catch (error) {
			console.log(error);

			if (error.message === "TokenExpiredError") {
				throw new Error(
					"An error occurred while getting the token payload",
				);
			} else {
				throw new Error(
					"An error occurred while checking the token expiration",
				);
			}
		}
	}

	public static getPayload(token: string) {
		try {
			const payload = jwt.decode(token) as any;

			if (!payload) {
				throw new Error("Token has no payload");
			}

			return payload;
		} catch (error) {
			console.log(error);
			throw new Error(
				"An error occurred while getting the token payload",
			);
		}
	}

	private static getSecret(type: TokenTypeEnum) {
		switch (type) {
			case TokenTypeEnum.ACCESS:
				return settings.ACCESS_JWT_SECRET;
			case TokenTypeEnum.REFRESH:
				return settings.REFRESH_JWT_SECRET;
			default:
				return settings.JWT_SECRET;
		}
	}
}
