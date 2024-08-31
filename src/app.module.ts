// CONFIGS
import {
	Global,
	// MiddlewareConsumer,
	Module,
} from "@nestjs/common";
// import { AppController } from "@modules/app.controller";
// import { AppService } from "@modules/app.service";
// import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { MongooseConfig } from "@config/database/mongoose.config";
import { MailModule } from "@src/providers/mail/mail.module";
// import { StripeModule } from "@providers/services/stripe/stripe.module";
import { settings } from "@constants/settings";

// MODULES
import { ClientsModule } from "@modules/clients/clients.module";
// import { CustomFieldsModule } from "@modules/custom-fields/custom-fields.module";
// import { CustomersModule } from "@modules/customers/customers.module";
// import { NotificationsModule } from "TEMPORAIRE/notifications/notifications.module";
// import { PaymentsModule } from "@modules/payments/payments.module";
// import { PlansModule } from "@modules/plans/plans.module";
// import { SubscriptionsModule } from "@modules/subscriptions/subscriptions.module";
import { UsersModule } from "@modules/users/users.module";
import { AuthModule } from "@modules/auth/auth.module";
import { LogsModule } from "@modules/logs/logs.module";
import { ThrottlerConfig } from "@config/security/throttler.config";
import { StripeModule } from "@src/providers/stripe/stripe.module";
import { BookerEmployeesModule } from "@modules/booker-employees/booker-employees.module";
import { EmployeesModule } from "@modules/employees/employees.module";
// import { EstablishmentsModule } from "@modules/establishments/establishments.module";
import { OrganizationsModule } from "@modules/organizations/organizations.module";
import { PlanPricesModule } from "@modules/plan-prices/plan-prices.module";
import { PlansModule } from "@modules/plans/plans.module";
import { MongooseModule } from "@nestjs/mongoose";
// import { PromoCodesModule } from "@modules/promo-codes/promo-codes.module";
// import { SubscriptionsModule } from "@modules/subscriptions/subscriptions.module";
// import { TeamsModule } from "@modules/teams/teams.module";
// import { APP_GUARD } from "@nestjs/core";
// import { ThrottlerBehindProxyGuard } from "@guards/throttler-behind-proxy.guard";

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ".env",
		}),
		MongooseModule,
		MongooseConfig,
		MailModule,
		ThrottlerConfig,
		StripeModule,
		LogsModule,
		AuthModule,
		BookerEmployeesModule,
		UsersModule,
		ClientsModule,
		EmployeesModule,
		// EstablishmentsModule,
		OrganizationsModule,
		PlanPricesModule,
		PlansModule,
		// PromoCodesModule,
		// SubscriptionsModule,
		// TeamsModule,

		// Clients
		// CustomFieldsModule,
		// CustomersModule,
		// NotificationsModule,
		// PaymentsModule,
		// PlansModule,
		// SubscriptionsModule,
	],
	controllers: [],
	providers: [
		// {
		// 	provide: APP_GUARD,
		// 	useClass: ThrottlerBehindProxyGuard,
		// },
	],
	exports: [AppModule],
})
export class AppModule {}
