/**
 * Utility class for handling notification-related operations.
 */
export class NotificationHelper {
	/**
	 * Checks if a phone number is required for SMS notifications.
	 *
	 * @param {string} phone - The phone number to check.
	 * @param {boolean} notificationSms - Indicates whether SMS notification is enabled.
	 * @throws {Error} If `notificationSms` is true and no phone number is provided.
	 * @returns {boolean} Always returns false.
	 */
	public static isPhoneRequired(phone: string, notificationSms: boolean) {
		if (notificationSms) {
			if (!phone) {
				throw new Error(
					"Phone number is required for SMS notification",
				);
			}
		}

		return false;
	}
}
