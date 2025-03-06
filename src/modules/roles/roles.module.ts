import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { RolesController } from "@modules/roles/roles.controller";
import { RolesService } from "@modules/roles/roles.service";
import { UserHelper } from "@modules/users/helpers/user.helper";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { MailService } from "@providers/mail/mail.service";
import { UserRolesService } from "@modules/user-roles/user-roles.service";
import { UserPermissionsService } from "@modules/user-permissions/user-permissions.service";
import { RolePermissionsService } from "@modules/role-permissions/role-permissions.service";

@Module({
	imports: [],
	controllers: [RolesController],
	providers: [
		RolesService,
		RolePermissionsService,
		UserRolesService,
		UserPermissionsService,
		MailService,
		MailHelper,
		UserHelper,
	],
	exports: [RolesService, RolesModule],
})
export class RolesModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(RolesController);
	}
}
