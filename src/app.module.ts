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
import { MailModule } from "@services/mail/mail.module";
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
import { StripeModule } from "@services/stripe/stripe.module";
// import { APP_GUARD } from "@nestjs/core";
// import { ThrottlerBehindProxyGuard } from "@guards/throttler-behind-proxy.guard";

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ".env",
		}),
		MongooseConfig,
		MailModule,
		ThrottlerConfig,
		StripeModule,
		LogsModule,
		AuthModule,
		UsersModule,
		ClientsModule,
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
