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
}
