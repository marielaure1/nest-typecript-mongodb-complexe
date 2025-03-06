import { UserTypeEnum } from "@enums/user-type.enum";

export class UserHelper {
	public static getUserTypeString(userType: UserTypeEnum): string {
		if (userType == UserTypeEnum.CLIENT) {
			return "client";
		} else if (userType == UserTypeEnum.EMPLOYEE) {
			return "employee";
		} else if (userType == UserTypeEnum.STAFF) {
			return "staff";
		}

		return "";
	}
}
