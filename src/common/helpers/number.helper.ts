export class NumberHelper {
	/**
	 * Checks if a number starts with a digit.
	 *
	 * @param {number|string} num - The number to check.
	 * @param {number|string} startNum - The start number to check.
	 * @returns {boolean} - True if the number starts with start number, false otherwise.
	 */
	static startsWith(num, startNum) {
		const strNum = num.toString(); // Convert the number to a string
		return strNum.startsWith(startNum); // Check if it starts with startNum
	}
}
