import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { PlansController } from "@modules/plans/plans.controller";
import { PlansService } from "@modules/plans/plans.service";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { LogsService } from "@modules/logs/logs.service";
import { LogHelper } from "@modules/logs/helpers/log.helper";
import { StripeProductService } from "@providers/stripe/product/stripe-product.service";

@Module({
	imports: [],
	controllers: [PlansController],
	providers: [
		PlansService,
		StripeProductService,
		MailService,
		MailHelper,
		LogsService,
		LogHelper,
	],
	exports: [PlansModule],
})
export class PlansModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(PlansController);
	}
}
