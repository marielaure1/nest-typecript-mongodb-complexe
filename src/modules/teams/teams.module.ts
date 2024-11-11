import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { TeamsController } from "@modules/teams/teams.controller";
import { TeamsService } from "@modules/teams/teams.service";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";

@Module({
	imports: [],
	controllers: [TeamsController],
	providers: [TeamsService, MailService, MailHelper],
	exports: [],
})
export class TeamsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(TeamsController);
	}
}
