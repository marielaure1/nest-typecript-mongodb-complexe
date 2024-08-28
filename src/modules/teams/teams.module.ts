import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { TeamsController } from "@modules/teams/teams.controller";
import { TeamsService } from "@modules/teams/teams.service";

@Module({
	imports: [],
	controllers: [TeamsController],
	providers: [TeamsService],
	exports: [],
})
export class TeamsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(TeamsController);
	}
}
