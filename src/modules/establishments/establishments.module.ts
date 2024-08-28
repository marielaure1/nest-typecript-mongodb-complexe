import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { EstablishmentsController } from "@modules/establishments/establishments.controller";
import { EstablishmentsService } from "@modules/establishments/establishments.service";

@Module({
	imports: [],
	controllers: [EstablishmentsController],
	providers: [EstablishmentsService],
	exports: [],
})
export class EstablishmentsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(EstablishmentsController);
	}
}
