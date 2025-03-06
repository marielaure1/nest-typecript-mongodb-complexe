import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { OrganizationsController } from "@modules/organizations/organizations.controller";
import { OrganizationsService } from "@modules/organizations/organizations.service";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { StaffsService } from "@modules/staffs/staffs.service";
import { StaffsModule } from "@modules/staffs/staffs.module";
import { PermissionsService } from "@modules/permissions/permissions.service";
// import { EstablishmentsService } from "@modules/establishments/establishments.service";

@Module({
	imports: [StaffsModule],
	controllers: [OrganizationsController],
	providers: [
		OrganizationsService,
		MailService,
		MailHelper,
		StaffsService,
		PermissionsService,
		// EstablishmentsService
	],
	exports: [],
})
export class OrganizationsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(OrganizationsController);
	}
}
