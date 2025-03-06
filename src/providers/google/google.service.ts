import { configService } from "@constants/env";
import { Injectable } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";

/**
 * Service for handling Google OAuth authentication.
 */
@Injectable()
export class GoogleAuthService {
	private client: OAuth2Client;

	/**
	 * Initializes the Google OAuth2 client with credentials from environment variables.
	 */
	constructor() {
		this.client = new OAuth2Client({
			clientId: configService.get<string>("AUTH_GOOGLE_ID"),
			clientSecret: configService.get<string>("AUTH_GOOGLE_SECRET"),
			redirectUri: configService.get<string>(
				"AUTH_GOOGLE_OAUTH_REDIRECT_URL",
			),
		});
	}

	/**
	 * Generates a Google authentication URL for user login.
	 *
	 * @param {any} state - Optional state object to include in the authentication request.
	 * @returns {string} - The generated Google authentication URL.
	 */
	generateAuthUrl(state: any): string {
		return this.client.generateAuthUrl({
			access_type: "offline",
			scope: ["email", "profile"],
			state: JSON.stringify(state),
		});
	}

	/**
	 * Exchanges an authorization code for Google OAuth tokens.
	 *
	 * @param {string} code - The authorization code obtained from Google OAuth login.
	 * @returns {Promise<any>} - A promise that resolves with the tokens (access, ID, refresh).
	 */
	async getTokens(code: string): Promise<any> {
		const { tokens } = await this.client.getToken(code);
		return tokens;
	}

	/**
	 * Retrieves user information from a given Google ID token.
	 *
	 * @param {string} idToken - The Google ID token.
	 * @returns {Promise<any>} - A promise that resolves with the user's profile information.
	 */
	async getUserInfo(idToken: string): Promise<any> {
		const ticket = await this.client.verifyIdToken({
			idToken,
			audience: configService.get<string>("AUTH_GOOGLE_ID"),
		});
		return ticket.getPayload();
	}

	/**
	 * Revokes a given Google authentication token.
	 *
	 * @param {string} token - The token to revoke.
	 * @throws {Error} - Throws an error if the revocation process fails.
	 * @returns {Promise<void>} - A promise that resolves once the token is revoked.
	 */
	async revokeToken(token: string): Promise<void> {
		try {
			await this.client.revokeToken(token);
		} catch (error: any) {
			throw new Error("Cannot revoke google token");
		}
	}
}
