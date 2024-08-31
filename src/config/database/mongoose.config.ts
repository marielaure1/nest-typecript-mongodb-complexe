// CONFIGS
import { Module, Global } from "@nestjs/common";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
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
import {
	BookerEmployee,
	BookerEmployeeSchema,
} from "@modules/booker-employees/entities/booker-employee.entity";
// import {
// 	Employee,
// 	EmployeeSchema,
// } from "@modules/employees/entities/employee.entity";
// import {
// 	Establishment,
// 	EstablishmentSchema,
// } from "@modules/establishments/entities/establishment.entity";
import {
	Organization,
	OrganizationSchema,
} from "@modules/organizations/entities/organization.entity";
import {
	PlanPrice,
	PlanPriceSchema,
} from "@modules/plan-prices/entities/plan-price.entity";
import { Plan, PlanSchema } from "@modules/plans/entities/plan.entity";
import { Connection } from "mongoose";
import {
	Employee,
	EmployeeSchema,
} from "@modules/employees/entities/employee.entity";
// import {
// 	PromoCode,
// 	PromoCodeSchema,
// } from "@modules/promo-codes/entities/promo-code.entity";
// import {
// 	Subscription,
// 	SubscriptionSchema,
// } from "@modules/subscriptions/entities/subscription.entity";
// import { Team, TeamSchema } from "@modules/teams/entities/team.entity";

@Global()
@Module({
	imports: [
		MongooseModule.forRoot(settings.MONGODB_URL),
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Client.name, schema: ClientSchema },
			{ name: Log.name, schema: LogSchema },
			{ name: BookerEmployee.name, schema: BookerEmployeeSchema },
			{ name: Employee.name, schema: EmployeeSchema },
			// { name: Establishment.name, schema: EstablishmentSchema },
			{ name: Organization.name, schema: OrganizationSchema },
			{ name: PlanPrice.name, schema: PlanPriceSchema },
			{ name: Plan.name, schema: PlanSchema },
			// { name: PromoCode.name, schema: PromoCodeSchema },
			// { name: Subscription.name, schema: SubscriptionSchema },
			// { name: Team.name, schema: TeamSchema },
			// { name: CustomField.name, schema: CustomFieldSchema },
			// { name: Customer.name, schema: CustomerSchema },
			// // { name: Notification.name, schema: NotificationSchema },
			// { name: Payment.name, schema: PaymentSchema },
			// { name: Plan.name, schema: PlanSchema },
			// { name: Subscription.name, schema: SubscriptionSchema },
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
