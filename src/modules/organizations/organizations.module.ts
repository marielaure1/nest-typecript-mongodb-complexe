import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { OrganizationsController } from "@modules/organizations/organizations.controller";
import { OrganizationsService } from "@modules/organizations/organizations.service";

@Module({
	imports: [],
	controllers: [OrganizationsController],
	providers: [OrganizationsService],
	exports: [],
})
export class OrganizationsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(OrganizationsController);
	}
}