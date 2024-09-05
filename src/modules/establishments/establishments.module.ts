import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { EstablishmentsController } from "@modules/establishments/establishments.controller";
import { EstablishmentsService } from "@modules/establishments/establishments.service";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";


@Module({
	imports: [],
	controllers: [EstablishmentsController],
	providers: [
		EstablishmentsService,
		MailService,
		MailHelper,
	],
	exports: [],
})
export class EstablishmentsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(EstablishmentsController);
	}
}
