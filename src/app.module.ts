// CONFIGS
import {
	Global,
	// MiddlewareConsumer,
	Module,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_FILTER } from "@nestjs/core";
// import { CacheModule } from "@nestjs/cache-manager";

// Config
import { MongooseConfig } from "@config/database/mongoose.config";
import { ThrottlerConfig } from "@config/security/throttler.config";

// Exceptions
import { ValidationExceptionFilter } from "@exceptions/validator.exception";

// Modules
import { MailModule } from "@src/providers/mail/mail.module";
import { ClientsModule } from "@modules/clients/clients.module";
import { UsersModule } from "@modules/users/users.module";
import { AuthModule } from "@modules/auth/auth.module";
import { LogsModule } from "@modules/logs/logs.module";
import { StripeModule } from "@src/providers/stripe/stripe.module";
import { StaffsModule } from "@modules/staffs/staffs.module";
import { EmployeesModule } from "@modules/employees/employees.module";
import { OrganizationsModule } from "@modules/organizations/organizations.module";
import { PlansModule } from "@modules/plans/plans.module";
import { LoggerModule } from "@providers/logger/logger.module";
import { OptionsModule } from "@modules/options/options.module";
import { FeaturesModule } from "@modules/features/features.module";
import { PlanFeaturesModule } from "@modules/plan-features/plan-features.module";
import { PlanOptionFeaturesModule } from "@modules/plan-option-features/plan-option-features.module";
import { OptionFeaturesModule } from "@modules/option-features/option-features.module";
import { PermissionsModule } from "@modules/permissions/permissions.module";
import { RolePermissionsModule } from "@modules/role-permissions/role-permissions.module";
import { RolesModule } from "@modules/roles/roles.module";
import { UserRolesModule } from "@modules/user-roles/user-roles.module";
import { UserPermissionsModule } from "@modules/user-permissions/user-permissions.module";
// import { CustomFieldsModule } from "@modules/custom-fields/custom-fields.module";
// import { CustomersModule } from "@modules/customers/customers.module";
// import { NotificationsModule } from "TEMPORAIRE/notifications/notifications.module";
// import { PaymentsModule } from "@modules/payments/payments.module";
// import { PlansModule } from "@modules/plans/plans.module";
// import { SubscriptionsModule } from "@modules/subscriptions/subscriptions.module";
// import { LogsService } from "@modules/logs/logs.service";
// import { PromoCodesModule } from "@modules/promo-codes/promo-codes.module";
// import { SubscriptionsModule } from "@modules/subscriptions/subscriptions.module";
import { TeamsModule } from "@modules/teams/teams.module";
// import { APP_GUARD } from "@nestjs/core";
// import { ThrottlerBehindProxyGuard } from "@guards/throttler-behind-proxy.guard";

/**
 * Global application module that imports and configures all required modules.
 */
@Global()
@Module({
	imports: [
		/**
		 * Loads configuration settings from `.env` and makes them available globally.
		 */
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		// CacheModule.register({
		// 	isGlobal: true,
		// 	ttl: 60 * 60,
		// 	max: 100,
		//   }),

		MongooseModule, // Integrates Mongoose for database connection.
		MongooseConfig, // Custom Mongoose configuration.
		ThrottlerConfig, // Configures rate limiting for API security.
		MailModule, // Handles email sending functionality.
		StripeModule, // Handles payment processing with Stripe.
		LoggerModule, // Provides logging functionality.
		LogsModule, // Manages logging data storage.
		AuthModule, // Handles authentication and authorization.
		StaffsModule, // Manages staff-related functionalities.
		UsersModule, // Handles user management.
		ClientsModule, // Manages client-related operations.
		EmployeesModule, // Manages employee-related operations.
		OrganizationsModule, // Handles organization-related operations.
		PlansModule, // Handles subscription plan functionalities.
		OptionsModule,
		PlanFeaturesModule,
		FeaturesModule,
		PlanOptionFeaturesModule,
		OptionFeaturesModule,
		// Authorization
		RolePermissionsModule,
		RolesModule,
		PermissionsModule,
		UserRolesModule,
		UserPermissionsModule,

		// PromoCodesModule,
		// SubscriptionsModule,
		TeamsModule,

		// CustomFieldsModule,
		// NotificationsModule,
		// PaymentsModule,
		// SubscriptionsModule,
	],
	controllers: [],
	providers: [
		/**
		 * Global exception filter for handling validation errors.
		 */
		{
			provide: APP_FILTER,
			useClass: ValidationExceptionFilter,
		},
	],
	exports: [],
})
export class AppModule {}
