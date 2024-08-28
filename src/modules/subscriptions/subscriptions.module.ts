import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { SubscriptionsController } from "@modules/subscriptions/subscriptions.controller";
import { SubscriptionsService } from "@modules/subscriptions/subscriptions.service";

@Module({
	imports: [],
	controllers: [SubscriptionsController],
	providers: [SubscriptionsService],
	exports: [],
})
export class SubscriptionsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(SubscriptionsController);
	}
}
