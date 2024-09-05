import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { PlansController } from "@modules/plans/plans.controller";
import { PlansService } from "@modules/plans/plans.service";

import { StripeProductService } from "@providers/stripe/product/stripe-product.service";

@Module({
	imports: [],
	controllers: [PlansController],
	providers: [
		PlansService,
		StripeProductService,
	],
	exports: [PlansService],
})
export class PlansModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(PlansController);
	}
}
