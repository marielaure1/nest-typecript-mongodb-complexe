import { Module, MiddlewareConsumer, Global } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { TeamsController } from "@modules/teams/teams.controller";
import { TeamsService } from "@modules/teams/teams.service";
import { UserHelper } from "@modules/users/helpers/user.helper";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { MailService } from "@providers/mail/mail.service";

@Global()
@Module({
	imports: [],
	controllers: [TeamsController],
	providers: [TeamsService, MailService, MailHelper, UserHelper],
	exports: [TeamsService, TeamsModule],
})
export class TeamsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(TeamsController);
	}
}
