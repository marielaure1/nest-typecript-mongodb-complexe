import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { OrganizationsController } from "@modules/organizations/organizations.controller";
import { OrganizationsService } from "@modules/organizations/organizations.service";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";


@Module({
	imports: [],
	controllers: [OrganizationsController],
	providers: [
		OrganizationsService,
		MailService,
		MailHelper,
	],
	exports: [],
})
export class OrganizationsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(OrganizationsController);
	}
}
