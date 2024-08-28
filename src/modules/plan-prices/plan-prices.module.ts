import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { PlanPricesController } from '@modules/plan-prices/plan-prices.controller';
import { PlanPricesService } from '@modules/plan-prices/plan-prices.service';

@Module({
  imports: [],
  controllers: [PlanPricesController],
  providers: [PlanPricesService],
  exports: [PlanPricesModule],
})
export class PlanPricesModule {
  configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(PlanPricesController);
	}
}
