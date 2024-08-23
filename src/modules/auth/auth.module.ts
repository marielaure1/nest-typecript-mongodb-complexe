import { Module } from "@nestjs/common";
import { AuthController } from "@modules/auth/auth.controller";
import { UsersService } from "@modules/users/users.service";
import { ClientsService } from "@modules/clients/clients.service";
import { MailHelper } from "@services/mail/helpers/mail.helper";
import { MailModule } from "@services/mail/mail.module";
import { MailService } from "@services/mail/mail.service";
import { LogsService } from "@modules/logs/logs.service";

@Module({
	imports: [MailModule],
	controllers: [AuthController],
	providers: [
		UsersService,
		ClientsService,
		MailService,
		MailHelper,
		LogsService,
	],
})
export class AuthModule {}
