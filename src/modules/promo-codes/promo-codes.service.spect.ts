import { Test, TestingModule } from "@nestjs/testing";
import { PromoCodesController } from "@modules/promo-codes/promo-codes.controller";
import { PromoCodesService } from "@modules/promo-codes/promo-codes.service";

describe("PromoCodesService", () => {
	let controller: PromoCodesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PromoCodesController],
			providers: [PromoCodesService],
		}).compile();

		controller = module.get<PromoCodesController>(PromoCodesController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
