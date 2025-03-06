import { regex } from "@constants/regex";
import { UserDocument } from "@modules/users/entities/user.entity";

/**
 * Utility class for handling string-related operations.
 */
export class StringHelper {
	/**
	 * Removes the last occurrence of the letter "s" from a string.
	 *
	 * @param {string} str - The original string.
	 * @returns {string} - The modified string without the last "s".
	 */
	static removeLastS(str) {
		const lastIndex = str.lastIndexOf("s");
		if (lastIndex === -1) return str; // If "s" is not found, return the original string
		return str.slice(0, lastIndex) + str.slice(lastIndex + 1);
	}

	/**
	 * Capitalizes the first letter of a string.
	 *
	 * @param {string} str - The original string.
	 * @returns {string} - The string with the first letter capitalized.
	 */
	static capitalizeFirstLetter(str) {
		if (!str) return str;
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	/**
	 * Converts a string to kebab-case in lowercase.
	 *
	 * @param {string} str - The original string.
	 * @returns {string} - The kebab-case formatted string in lowercase.
	 */
	static kebabCaseLower(str) {
		if (!str) return str;
		return str
			.replace(/([a-z])([A-Z])/g, "$1-$2") // Add hyphen between camelCase
			.replace(/\s+/g, "-") // Replace spaces with hyphens
			.replace(/[^a-zA-Z0-9-]/g, "") // Remove special characters
			.toLowerCase();
	}

	/**
	 * Generates a random password.
	 * @returns {string} - A randomly generated password.
	 */
	static generatePassword(): string {
		const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
		const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const numbers = "0123456789";

		const allCharacters = lowerCaseLetters + upperCaseLetters + numbers;

		const passwordLength = 8;
		let password = "";

		password +=
			lowerCaseLetters[
				Math.floor(Math.random() * lowerCaseLetters.length)
			];
		password +=
			upperCaseLetters[
				Math.floor(Math.random() * upperCaseLetters.length)
			];
		password += numbers[Math.floor(Math.random() * numbers.length)];

		for (let i = 3; i < passwordLength; i++) {
			password +=
				allCharacters[Math.floor(Math.random() * allCharacters.length)];
		}

		password = password
			.split("")
			.sort(() => 0.5 - Math.random())
			.join("");

		const regexExp = new RegExp(regex.password);

		if (regexExp.test(password)) {
			return password;
		} else {
			// If the password does not match the regex, generate a new one
			return this.generatePassword();
		}
	}

	/**
	 * Remove the password field from UserDocument
	 * @param user
	 * @returns
	 */
	static removePassword(user: UserDocument): UserDocument {
		const userWithoutPassword = user.toObject();
		delete userWithoutPassword.password;

		return userWithoutPassword;
	}
}
