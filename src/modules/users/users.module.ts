import { MailModule } from "@providers/mail/mail.module";
import { MailService } from "@providers/mail/mail.service";
import { Global, Module } from "@nestjs/common";
import { UsersService } from "@modules/users/users.service";
import { UsersController } from "@modules/users/users.controller";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { LogsService } from "@modules/logs/logs.service";
import { LogHelper } from "@modules/logs/helpers/log.helper";

@Global()
@Module({
	imports: [],
	controllers: [UsersController],
	providers: [UsersService, MailService, MailHelper, LogsService, LogHelper],
	exports: [UsersModule, UsersService],
})
export class UsersModule {}
