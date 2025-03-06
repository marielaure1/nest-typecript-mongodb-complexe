import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { PlansController } from "@modules/plans/plans.controller";
import { PlansService } from "@modules/plans/plans.service";
import { PlanOptionFeaturesService } from "@modules/plan-option-features/plan-option-features.service";

@Module({
	imports: [],
	controllers: [PlansController],
	providers: [PlansService, PlanOptionFeaturesService],
	exports: [PlansService],
})
export class PlansModule {
	// configure(consumer: MiddlewareConsumer) {
	// 	consumer.apply(AuthMiddleware).forRoutes(PlansController);
	// }
}
