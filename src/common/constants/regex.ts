/**
 * Regular expressions for common validation rules.
 */

export const regex = {
	/**
	 * Regular expressions for common validation rules.
	 */
	password:
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
	/**
	 * Validates phone numbers with an optional international prefix.
	 */
	phone: /^\+?(\d{1,3})?[-.\s]?\d{9,12}$/,
	/**
	 * Validates email addresses ensuring a valid domain format.
	 */
	email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};
