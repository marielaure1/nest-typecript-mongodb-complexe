/**
 * Utility class for handling number-related operations.
 */
export class NumberHelper {
	/**
	 * Checks if a number or string representation of a number starts with a specific digit or sequence.
	 *
	 * @param {number | string} num - The number or string to check.
	 * @param {number | string} startNum - The starting digit(s) to compare against.
	 * @returns {boolean} - Returns `true` if `num` starts with `startNum`, otherwise `false`.
	 */
	static startsWith(num, startNum) {
		const strNum = num.toString(); // Convert the number to a string
		return strNum.startsWith(startNum); // Check if it starts with startNum
	}
}
