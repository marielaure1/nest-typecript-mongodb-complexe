import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { EstablishmentsController } from "@modules/establishments/establishments.controller";
import { EstablishmentsService } from "@modules/establishments/establishments.service";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { LogsService } from "@modules/logs/logs.service";
import { LogHelper } from "@modules/logs/helpers/log.helper";

@Module({
	imports: [],
	controllers: [EstablishmentsController],
	providers: [
		EstablishmentsService,
		MailService,
		MailHelper,
		LogsService,
		LogHelper,
	],
	exports: [],
})
export class EstablishmentsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(EstablishmentsController);
	}
}
