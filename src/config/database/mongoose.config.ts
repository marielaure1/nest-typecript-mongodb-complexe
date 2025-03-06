// CONFIGS
import { Module, Global } from "@nestjs/common";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

// Dependencies
import { Connection } from "mongoose";

// MODULES

// Account
import { User, UserSchema } from "@modules/users/entities/user.entity";
import { Client, ClientSchema } from "@modules/clients/entities/client.entity";
import {
	Employee,
	EmployeeSchema,
} from "@modules/employees/entities/employee.entity";
import { Staff, StaffSchema } from "@modules/staffs/entities/staff.entity";

// Products
import { Plan, PlanSchema } from "@modules/plans/entities/plan.entity";
import { Option, OptionSchema } from "@modules/options/entities/option.entity";
import {
	Feature,
	FeatureSchema,
} from "@modules/features/entities/feature.entity";
import {
	PlanFeature,
	PlanFeatureSchema,
} from "@modules/plan-features/entities/plan-feature.entity";

// Subscriptions

// Companies
import {
	Organization,
	OrganizationSchema,
} from "@modules/organizations/entities/organization.entity";
import { Team, TeamSchema } from "@modules/teams/entities/team.entity";

// Activities
import { Log, LogSchema } from "@modules/logs/entities/log.entity";

// Security
import {
	RefreshToken,
	RefreshTokenSchema,
} from "@modules/auth/entities/refresh-token.entity";
import {
	PlanOptionFeature,
	PlanOptionFeatureSchema,
} from "@modules/plan-option-features/entities/plan-option-feature.entity";
import {
	OptionFeature,
	OptionFeatureSchema,
} from "@modules/option-features/entities/option-feature.entity";

// Authorization
import { Role, RoleSchema } from "@modules/roles/entities/role.entity";
import {
	Permission,
	PermissionSchema,
} from "@modules/permissions/entities/permission.entity";
import {
	RolePermission,
	RolePermissionSchema,
} from "@modules/role-permissions/entities/role-permission.entity";
import {
	UserRole,
	UserRoleSchema,
} from "@modules/user-roles/entities/user-role.entity";
import {
	UserPermission,
	UserPermissionSchema,
} from "@modules/user-permissions/entities/user-permission.entity";

// Config

@Global()
@Module({
	imports: [
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>("MONGODB_URL"),
			}),
		}),
		MongooseModule.forFeature([
			// Account
			{ name: User.name, schema: UserSchema },
			{ name: Client.name, schema: ClientSchema },
			{ name: Staff.name, schema: StaffSchema },
			{ name: Employee.name, schema: EmployeeSchema },

			// Products
			{ name: Plan.name, schema: PlanSchema },
			{ name: Option.name, schema: OptionSchema },
			{ name: PlanFeature.name, schema: PlanFeatureSchema },
			{ name: Feature.name, schema: FeatureSchema },
			{ name: PlanOptionFeature.name, schema: PlanOptionFeatureSchema },
			{ name: OptionFeature.name, schema: OptionFeatureSchema },
			// { name: PromoCode.name, schema: PromoCodeSchema },

			// Subscriptions
			// { name: Subscription.name, schema: SubscriptionSchema },
			// { name: Payment.name, schema: PaymentSchema },

			// Companies
			{ name: Organization.name, schema: OrganizationSchema },
			{ name: Team.name, schema: TeamSchema },

			// Activities
			{ name: Log.name, schema: LogSchema },
			// { name: Notification.name, schema: NotificationSchema },

			// Security
			{ name: RefreshToken.name, schema: RefreshTokenSchema },

			// Config
			// { name: CustomField.name, schema: CustomFieldSchema },

			// Authorization
			{ name: Role.name, schema: RoleSchema },
			{ name: Permission.name, schema: PermissionSchema },
			{ name: RolePermission.name, schema: RolePermissionSchema },
			{ name: UserRole.name, schema: UserRoleSchema },
			{ name: UserPermission.name, schema: UserPermissionSchema },
		]),
	],
	providers: [
		{
			provide: Connection,
			useFactory: (connection: Connection) => connection,
			inject: [getConnectionToken()],
		},
	],
	exports: [MongooseModule, Connection],
})
export class MongooseConfig {}
