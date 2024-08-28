import { Test, TestingModule } from "@nestjs/testing";
import { EstablishmentsController } from "@modules/establishments/establishments.controller";
import { EstablishmentsService } from "@modules/establishments/establishments.service";

describe("EstablishmentsService", () => {
	let controller: EstablishmentsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EstablishmentsController],
			providers: [EstablishmentsService],
		}).compile();

		controller = module.get<EstablishmentsController>(
			EstablishmentsController,
		);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
