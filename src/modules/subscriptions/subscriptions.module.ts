import { MiddlewareConsumer, Module } from "@nestjs/common";
import { DatabaseModule } from "@config/database/mongoose/mongoose.module";
import { SubscriptionsService } from "@modules/subscriptions/subscriptions.service";
import { CustomersService } from "@modules/customers/customers.service";
import { UsersService } from "@modules/users/users.service";
import { PlansService } from "@modules/plans/plans.service";
import { SubscriptionsController } from "@modules/subscriptions/subscriptions.controller";
import { StripeModule } from "@providers/services/stripe/stripe.module";
import { SubscriptionsStripeService } from "@providers/services/stripe/services/subscriptions.stripe.service";
import { CustomersStripeService } from "@providers/services/stripe/services/customers.stripe.service";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { WebsocketModule } from "@modules/websocket/websocket.module";

@Module({
	imports: [DatabaseModule, StripeModule, WebsocketModule],
	controllers: [SubscriptionsController],
	providers: [
		SubscriptionsService,
		SubscriptionsStripeService,
		CustomersStripeService,
		CustomersService,
		UsersService,
		PlansService,
	],
	exports: [SubscriptionsModule],
})
export class SubscriptionsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(SubscriptionsController);
	}
}
