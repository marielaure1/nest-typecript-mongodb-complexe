import { Logger } from "@nestjs/common";
import * as argon2 from "argon2";

let logger = new Logger();

/**
 * Utility class for handling hashing operations using Argon2.
 */
export class Hash {
	/**
	 * Hashes a given string using Argon2.
	 *
	 * @param {string} data - The data to hash.
	 * @returns {Promise<string | void>} - The hashed data or void in case of an error.
	 */
	public static async hashData(data: string) {
		try {
			const hash = await argon2.hash(data, {
				type: argon2.argon2i,
			});

			return hash;
		} catch (error: any) {
			logger.error("[ERROR] => class Hash => hashData : ");
			console.error("[ERROR_DATAS] :", error);
		}
	}

	/**
	 * Compares a given string with a hashed value to verify if they match.
	 *
	 * @param {string} data - The raw data to compare.
	 * @param {string} dataHash - The hashed data to compare against.
	 * @returns {Promise<boolean | void>} - True if the data matches the hash, false otherwise, or void in case of an error.
	 */
	public static async hashCompareData(data: string, dataHash: string) {
		try {
			const verfified = await argon2.verify(dataHash, data);

			return verfified;
		} catch (error: any) {
			logger.error("[ERROR] => class Hash => hashCompareData : ", error);
			console.error("[ERROR_DATAS] :", error);
		}
	}
}
