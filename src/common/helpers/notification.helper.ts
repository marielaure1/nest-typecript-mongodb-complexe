export class NotificationHelper {
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
