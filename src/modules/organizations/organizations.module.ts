import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { OrganizationsController } from "@modules/organizations/organizations.controller";
import { OrganizationsService } from "@modules/organizations/organizations.service";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { LogsService } from "@modules/logs/logs.service";
import { LogHelper } from "@modules/logs/helpers/log.helper";

@Module({
	imports: [],
	controllers: [OrganizationsController],
	providers: [
		OrganizationsService,
		MailService,
		MailHelper,
		LogsService,
		LogHelper,
	],
	exports: [],
})
export class OrganizationsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(OrganizationsController);
	}
}
