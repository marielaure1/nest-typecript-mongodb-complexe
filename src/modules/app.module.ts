// CONFIGS
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "@modules/app.controller";
import { AppService } from "@modules/app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@config/database/mongoose/mongoose.module";
import { StripeModule } from "@providers/services/stripe/stripe.module";
import settings from "@constants/settings";

// MODULES
import { ClientsModule } from "@modules/clients/clients.module";
import { CustomFieldsModule } from "@modules/custom-fields/custom-fields.module";
import { CustomersModule } from "@modules/customers/customers.module";
// import { NotificationsModule } from '@modules/notifications/notifications.module';
import { PaymentsModule } from "@modules/payments/payments.module";
import { PlansModule } from "@modules/plans/plans.module";
import { SubscriptionsModule } from "@modules/subscriptions/subscriptions.module";
import { UsersModule } from "@modules/users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ".env",
		}),
		DatabaseModule,
		StripeModule,
		ClientsModule,
		CustomFieldsModule,
		CustomersModule,
		// NotificationsModule,
		PaymentsModule,
		PlansModule,
		SubscriptionsModule,
		UsersModule,
	],
	controllers: [],
	providers: [],
	exports: [AppModule],
})
export class AppModule {}
