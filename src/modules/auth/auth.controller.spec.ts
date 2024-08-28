import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "@modules/auth/auth.controller";
import { AuthService } from "@modules/auth/auth.service";

// TODO: Add more tests
describe("AuthController", () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [AuthService],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
