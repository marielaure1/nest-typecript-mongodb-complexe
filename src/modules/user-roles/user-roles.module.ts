import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { UserRolesController } from "@modules/user-roles/user-roles.controller";
import { UserRolesService } from "@modules/user-roles/user-roles.service";
import { UserHelper } from "@modules/users/helpers/user.helper";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { MailService } from "@providers/mail/mail.service";

@Module({
	imports: [],
	controllers: [UserRolesController],
	providers: [UserRolesService, MailService, MailHelper, UserHelper],
	exports: [UserRolesService, UserRolesModule],
})
export class UserRolesModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(UserRolesController);
	}
}
