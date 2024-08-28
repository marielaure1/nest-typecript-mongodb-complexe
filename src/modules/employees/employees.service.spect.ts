import { Test, TestingModule } from "@nestjs/testing";
import { EmployeesController } from "@modules/employees/employees.controller";
import { EmployeesService } from "@modules/employees/employees.service";

describe("EmployeesService", () => {
	let controller: EmployeesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EmployeesController],
			providers: [EmployeesService],
		}).compile();

		controller = module.get<EmployeesController>(EmployeesController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
