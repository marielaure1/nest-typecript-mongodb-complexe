import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { RolePermissionsController } from "@modules/role-permissions/role-permissions.controller";
import { RolePermissionsService } from "@modules/role-permissions/role-permissions.service";
import { UserHelper } from "@modules/users/helpers/user.helper";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { MailService } from "@providers/mail/mail.service";
import { RolesService } from "@modules/roles/roles.service";
import { PermissionsService } from "@modules/permissions/permissions.service";
import { PermissionsModule } from "@modules/permissions/permissions.module";
import { TeamsService } from "@modules/teams/teams.service";
import { EstablishmentsService } from "@modules/establishments/establishments.service";

@Module({
	imports: [PermissionsModule],
	controllers: [RolePermissionsController],
	providers: [
		RolePermissionsService,
		PermissionsService,
		RolesService,
		EstablishmentsService,
		TeamsService,
		MailService,
		MailHelper,
		UserHelper,
	],
	exports: [RolePermissionsService],
})
export class RolePermissionsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(RolePermissionsController);
	}
}
