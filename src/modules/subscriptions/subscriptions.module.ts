import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { SubscriptionsController } from "@modules/subscriptions/subscriptions.controller";
import { SubscriptionsService } from "@modules/subscriptions/subscriptions.service";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";

@Module({
	imports: [],
	controllers: [SubscriptionsController],
	providers: [SubscriptionsService, MailService, MailHelper],
	exports: [],
})
export class SubscriptionsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(SubscriptionsController);
	}
}
