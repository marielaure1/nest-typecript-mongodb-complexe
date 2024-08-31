import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { PlanPricesController } from "@modules/plan-prices/plan-prices.controller";
import { PlanPricesService } from "@modules/plan-prices/plan-prices.service";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { LogsService } from "@modules/logs/logs.service";
import { LogHelper } from "@modules/logs/helpers/log.helper";

@Module({
	imports: [],
	controllers: [PlanPricesController],
	providers: [
		PlanPricesService,
		MailService,
		MailHelper,
		LogsService,
		LogHelper,
	],
	exports: [PlanPricesModule],
})
export class PlanPricesModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(PlanPricesController);
	}
}
