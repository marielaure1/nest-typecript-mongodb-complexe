import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { PromoCodesController } from "@modules/promo-codes/promo-codes.controller";
import { PromoCodesService } from "@modules/promo-codes/promo-codes.service";
import { MailService } from "@providers/mail/mail.service";
import { LogsService } from "@modules/logs/logs.service";
import { LogHelper } from "@modules/logs/helpers/log.helper";
import { MailHelper } from "@providers/mail/helpers/mail.helper";

@Module({
	imports: [],
	controllers: [PromoCodesController],
	providers: [
		PromoCodesService,
		MailService,
		MailHelper,
		LogsService,
		LogHelper,
	],
	exports: [],
})
export class PromoCodesModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(PromoCodesController);
	}
}
