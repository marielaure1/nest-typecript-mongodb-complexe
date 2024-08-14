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
import { DatabaseModule } from "@config/database/mongoose/mongoose.module";
import { MailModule } from "@config/mail/mail.module";
// import { StripeModule } from "@providers/services/stripe/stripe.module";
import settings from "@constants/settings";

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
import { JwtModule } from "@config/session/jwt.module";

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ".env",
		}),
		DatabaseModule,
		MailModule,
		AuthModule,
		JwtModule,
		// StripeModule,
		ClientsModule,
		// CustomFieldsModule,
		// CustomersModule,
		// NotificationsModule,
		// PaymentsModule,
		// PlansModule,
		// SubscriptionsModule,
		UsersModule,
	],
	controllers: [],
	providers: [],
	exports: [AppModule],
})
export class AppModule {}
