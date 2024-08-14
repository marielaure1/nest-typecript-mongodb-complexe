import bcrypt from "bcrypt";
import * as cryptoJS from "crypto-js";

export default class Hash {
	public salt = 10;
	public bcrypt = bcrypt;
	public crypto = cryptoJS;

	public async hashData(data: string, saltCustom?: number) {
		try {
			const salt = await this.bcrypt.genSalt(
				saltCustom ? saltCustom : this.salt,
			);
			const hash = await this.bcrypt.hash(data, salt);

			return hash;
		} catch (error) {
			console.log(error.message);
		}
	}

	public async hashCompareData(
		data: string,
		dataToCompare: string,
		saltCustom?: number,
	) {
		try {
			const salt = await this.bcrypt.genSalt(
				saltCustom ? saltCustom : this.salt,
			);
			const hash = await this.bcrypt.hash(data, salt);

			const compareData = await this.bcrypt.compare(dataToCompare, hash);

			return compareData;
		} catch (error) {
			console.log(error.message);
		}
	}

	public generateToken(data: string) {
		try {
			const secretKey = "ID CLIENT";
			const token = this.crypto.HmacSHA256(data, secretKey).toString();

			return token;
		} catch (error) {
			console.log(error);
		}
	}
}
