import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
	ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
// import { FirebaseService } from '@providers/services/firebase/firebase.service';
import { UsersService } from "@modules/users/users.service";
// import { CustomersService } from "@modules/customers/customers.service";

// import { ROLES_KEY } from "@decorators/roles.decorator";
import { OWNERSHIP_KEY } from "@decorators/ownership.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor() {} // private readonly reflector: Reflector // private readonly customersService: CustomersService, // private readonly usersService: UsersService, // private readonly firebaseService: FirebaseService,

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		try {
			// const user = await this.usersService.findOne(request["request"].uid);
			// request['user'] = user;

			// const customer = await this.customersService.findOneByUser(user._id);
			// request['customer'] = customer;

			// const ownership = this.reflector.get(OWNERSHIP_KEY, context.getHandler());

			// const roles = this.reflector.get<RoleEnum[]>(ROLES_KEY, context.getHandler());

			// if (!roles || ownership) {
			//   return true;
			// }

			// const userRole = user.role;

			// if (!this.hasRole(userRole, roles)) {
			//   throw new ForbiddenException('You do not have permission to access this resource');
			// }

			return true;
		} catch (error: any) {
			throw new UnauthorizedException("Invalid token");
		}
	}

	// private hasRole(userRole: RoleEnum, roles: RoleEnum[]): boolean {
	// 	const roleHierarchy = {
	// 		[RoleEnum.CLIENT]: [RoleEnum.CLIENT],
	// 		[RoleEnum.EMPLOYEE]: [RoleEnum.CLIENT, RoleEnum.EMPLOYEE],
	// 		[RoleEnum.ADMIN]: [
	// 			RoleEnum.CLIENT,
	// 			RoleEnum.EMPLOYEE,
	// 			RoleEnum.ADMIN,
	// 		],
	// 		[RoleEnum.SUPER_ADMIN]: [
	// 			RoleEnum.CLIENT,
	// 			RoleEnum.EMPLOYEE,
	// 			RoleEnum.ADMIN,
	// 			RoleEnum.SUPER_ADMIN,
	// 		],
	// 		[RoleEnum.BRAINST_EMPLOYEE]: [
	// 			RoleEnum.CLIENT,
	// 			RoleEnum.EMPLOYEE,
	// 			RoleEnum.ADMIN,
	// 			RoleEnum.SUPER_ADMIN,
	// 			RoleEnum.BRAINST_EMPLOYEE,
	// 		],
	// 		[RoleEnum.BRAINST_ADMIN]: [
	// 			RoleEnum.CLIENT,
	// 			RoleEnum.EMPLOYEE,
	// 			RoleEnum.ADMIN,
	// 			RoleEnum.SUPER_ADMIN,
	// 			RoleEnum.BRAINST_EMPLOYEE,
	// 			RoleEnum.BRAINST_ADMIN,
	// 		],
	// 		[RoleEnum.BRAINST_SUPER_ADMIN]: [
	// 			RoleEnum.CLIENT,
	// 			RoleEnum.EMPLOYEE,
	// 			RoleEnum.ADMIN,
	// 			RoleEnum.SUPER_ADMIN,
	// 			RoleEnum.BRAINST_EMPLOYEE,
	// 			RoleEnum.BRAINST_ADMIN,
	// 			RoleEnum.BRAINST_SUPER_ADMIN,
	// 		],
	// 	};

	// 	const allowedRoles = roleHierarchy[userRole] || [];
	// 	return roles.some((role) => allowedRoles.includes(role));
	// }
}
