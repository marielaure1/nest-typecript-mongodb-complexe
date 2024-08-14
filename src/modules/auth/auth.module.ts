import { Module } from "@nestjs/common";
import { AuthController } from "@modules/auth/auth.controller";
import { UsersService } from "@modules/users/users.service";
import { ClientsService } from "@modules/clients/clients.service";
import { Mail } from "@services/mail/mail.service";
import { MailModule } from "@config/mail/mail.module";

@Module({
	imports: [MailModule],
	controllers: [AuthController],
	providers: [UsersService, ClientsService, Mail],
})
export class AuthModule {}
