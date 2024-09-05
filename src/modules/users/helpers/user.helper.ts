import { UserRoleEnum } from "@enums/user-role.enum";

export class UserHelper {
	public static getUserType(role: UserRoleEnum): string {
		if (role.startsWith("ORGANIZATION_")) {
			return "Employee";
		} else if (role.startsWith("BOOKER_")) {
			return "BookerEmployee";
		}

		return "Client";
	}
}
