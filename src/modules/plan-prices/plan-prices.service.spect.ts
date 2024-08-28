import { Test, TestingModule } from "@nestjs/testing";
import { PlanPricesController } from "@modules/plan-prices/plan-prices.controller";
import { PlanPricesService } from "@modules/plan-prices/plan-prices.service";

describe("PlanPricesService", () => {
	let controller: PlanPricesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PlanPricesController],
			providers: [PlanPricesService],
		}).compile();

		controller = module.get<PlanPricesController>(PlanPricesController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
