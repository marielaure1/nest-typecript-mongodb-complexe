import { MailService } from "@providers/mail/mail.service";
import { Global, Module } from "@nestjs/common";
import { UsersService } from "@modules/users/users.service";
import { UsersController } from "@modules/users/users.controller";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { UserHelper } from "@modules/users/helpers/user.helper";

@Global()
@Module({
	imports: [],
	controllers: [UsersController],
	providers: [UsersService, MailService, MailHelper, UserHelper],
	exports: [UsersModule, UsersService, UserHelper],
})
export class UsersModule {}
