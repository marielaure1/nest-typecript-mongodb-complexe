import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { PermissionsController } from "@modules/permissions/permissions.controller";
import { PermissionsService } from "@modules/permissions/permissions.service";
import { UserHelper } from "@modules/users/helpers/user.helper";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { MailService } from "@providers/mail/mail.service";

@Module({
	imports: [],
	controllers: [PermissionsController],
	providers: [PermissionsService, MailService, MailHelper, UserHelper],
	exports: [PermissionsService, PermissionsModule],
})
export class PermissionsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(PermissionsController);
	}
}
