import { Test, TestingModule } from "@nestjs/testing";
import { {{pascalCase}}sController } from "@modules/{{kebabCase}}s.controller";
import { {{pascalCase}}sService } from "@modules/{{kebabCase}}s.service";

describe("{{pascalCase}}sController", () => {
	let controller: {{pascalCase}}sController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [{{pascalCase}}sController],
			providers: [{{pascalCase}}sService],
		}).compile();

		controller = module.get<{{pascalCase}}sController>({{pascalCase}}sController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
