import { Test, TestingModule } from "@nestjs/testing";
import { PlansController } from "@modules/plans/plans.controller";
import { PlansService } from "@modules/plans/plans.service";

describe("PlansService", () => {
	let controller: PlansController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PlansController],
			providers: [PlansService],
		}).compile();

		controller = module.get<PlansController>(PlansController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
