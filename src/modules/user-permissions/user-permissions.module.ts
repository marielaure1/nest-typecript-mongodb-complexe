import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { UserPermissionsController } from "@modules/user-permissions/user-permissions.controller";
import { UserPermissionsService } from "@modules/user-permissions/user-permissions.service";
import { UserHelper } from "@modules/users/helpers/user.helper";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { MailService } from "@providers/mail/mail.service";

@Module({
	imports: [],
	controllers: [UserPermissionsController],
	providers: [UserPermissionsService, MailService, MailHelper, UserHelper],
	exports: [UserPermissionsService, UserPermissionsModule],
})
export class UserPermissionsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(UserPermissionsController);
	}
}
