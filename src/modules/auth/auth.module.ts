import { Module } from "@nestjs/common";
import { AuthController } from "@modules/auth/auth.controller";
import { UsersService } from "@modules/users/users.service";
import { ClientsService } from "@modules/clients/clients.service";
import { MailHelper } from "@src/providers/mail/helpers/mail.helper";
import { MailService } from "@src/providers/mail/mail.service";
import { LogsService } from "@modules/logs/logs.service";
import { LogHelper } from "@modules/logs/helpers/log.helper";
import { BookerEmployeesService } from "@modules/booker-employees/booker-employees.service";
import { OrganizationsService } from "@modules/organizations/organizations.service";
import { LogsModule } from "@modules/logs/logs.module";

@Module({
	imports: [LogsModule],
	controllers: [AuthController],
	providers: [
		UsersService,
		ClientsService,
		BookerEmployeesService,
		OrganizationsService,
		MailService,
		MailHelper,
		LogsService,
		LogHelper,
	],
})
export class AuthModule {}
