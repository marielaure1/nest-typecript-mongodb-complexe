import * as argon2 from "argon2";

export default class Hash {
	/**
	 * @param data : string, data to hash
	 * @returns data hashed
	 */
	public static async hashData(data: string) {
		try {
			const hash = await argon2.hash(data, {
				type: argon2.argon2i,
			});

			return hash;
		} catch (error) {
			console.log(error.message);
		}
	}

	/**
	 * @param data : string, data to compare
	 * @param dataToCompare : string, data hashed to compare
	 * @returns data compared
	 */
	public static async hashCompareData(data: string, dataHash: string) {
		try {
			const verfified = await argon2.verify(dataHash, data);

			return verfified;
		} catch (error) {
			console.log(error.message);
		}
	}

	// public generateToken(data: string) {
	// 	try {
	// 		const secretKey = "ID CLIENT";
	// 		const token = this.crypto.HmacSHA256(data, secretKey).toString();

	// 		return token;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }
}
