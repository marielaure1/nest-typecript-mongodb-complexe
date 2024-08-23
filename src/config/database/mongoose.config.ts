// CONFIGS
import { Module, Global } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
// import { ConfigModule, ConfigService } from "@nestjs/config";
import { settings } from "@constants/settings";

// MODULES
import { Client, ClientSchema } from "@modules/clients/entities/client.entity";
// import {
// 	CustomField,
// 	CustomFieldSchema,
// } from "@modules/custom-fields/entities/custom-field.entity";
// import {
// 	Customer,
// 	CustomerSchema,
// } from "@modules/customers/entities/customer.entity";
// // import { Notification, NotificationSchema } from '@modules/notifications/entities/notification.entity';
// import {
// 	Payment,
// 	PaymentSchema,
// } from "@modules/payments/entities/payment.entity";
// import { Plan, PlanSchema } from "@modules/plans/entities/plan.entity";
// import {
// 	Subscription,
// 	SubscriptionSchema,
// } from "@modules/subscriptions/entities/subscription.entity";
import { User, UserSchema } from "@modules/users/entities/user.entity";
import { Log, LogSchema } from "@modules/logs/entities/log.entity";

@Global()
@Module({
	imports: [
		MongooseModule.forRoot(settings.MONGODB_URL),
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Client.name, schema: ClientSchema },
			{ name: Log.name, schema: LogSchema },
			// { name: CustomField.name, schema: CustomFieldSchema },
			// { name: Customer.name, schema: CustomerSchema },
			// // { name: Notification.name, schema: NotificationSchema },
			// { name: Payment.name, schema: PaymentSchema },
			// { name: Plan.name, schema: PlanSchema },
			// { name: Subscription.name, schema: SubscriptionSchema },
		]),
	],
	exports: [MongooseModule],
})
export class MongooseConfig {}
