import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { PermissionCategoriesController } from "@modules/permission-categories/permission-categories.controller";
import { PermissionCategoriesService } from "@modules/permission-categories/permission-categories.service";

@Module({
	imports: [],
	controllers: [PermissionCategoriesController],
	providers: [PermissionCategoriesService],
	exports: [PermissionCategoriesModule],
})
export class PermissionCategoriesModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.forRoutes(PermissionCategoriesController);
	}
}
