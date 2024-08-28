import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { PlansController } from "@modules/plans/plans.controller";
import { PlansService } from "@modules/plans/plans.service";
import { StripeProductProps } from "@services/stripe/product/stripe-product.interface";
import { StripePriceProps } from "@services/stripe/price/stripe-price.interface";

@Module({
	imports: [],
	controllers: [PlansController],
	providers: [PlansService, StripePriceProps, StripeProductProps],
	exports: [PlansModule],
})
export class PlansModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(PlansController);
	}
}
