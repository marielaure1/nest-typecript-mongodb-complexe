import { MiddlewareConsumer, Module } from "@nestjs/common";
import { PaymentsService } from "@modules/payments/payments.service";
import { PaymentsController } from "@modules/payments/payments.controller";
import { DatabaseModule } from "@config/database/mongoose/mongoose.module";
import { StripeModule } from "@providers/services/stripe/stripe.module";
import { PlansStripeService } from "@providers/services/stripe/services/plans.stripe.service";
import { PaymentsStripeService } from "@providers/services/stripe/services/payments.stripe.service";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { UsersService } from "@modules/users/users.service";
import { CustomersService } from "@modules/customers/customers.service";
import { WebhookStripeService } from "@providers/services/stripe/services/webhook.stripe.service";
import { SubscriptionsService } from "@modules/subscriptions/subscriptions.service";

@Module({
	imports: [DatabaseModule, StripeModule],
	controllers: [PaymentsController],
	providers: [
		PaymentsService,
		PaymentsStripeService,
		PlansStripeService,
		UsersService,
		CustomersService,
		SubscriptionsService,
		WebhookStripeService,
	],
	exports: [PaymentsModule],
})
export class PaymentsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(PaymentsController);
	}
}
