import { Test, TestingModule } from "@nestjs/testing";
import { BookerEmployeesController } from "@modules/booker-employees/booker-employees.controller";
import { BookerEmployeesService } from "@modules/booker-employees/booker-employees.service";

describe("BookerEmployeesService", () => {
	let controller: BookerEmployeesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [BookerEmployeesController],
			providers: [BookerEmployeesService],
		}).compile();

		controller = module.get<BookerEmployeesController>(
			BookerEmployeesController,
		);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
