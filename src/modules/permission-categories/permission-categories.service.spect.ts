import { Test, TestingModule } from "@nestjs/testing";
import { PermissionCategoriesController } from "@modules/permission-categories/permission-categories.controller";
import { PermissionCategoriesService } from "@modules/permission-categories/permission-categories.service";

describe("PermissionCategoriesService", () => {
	let controller: PermissionCategoriesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PermissionCategoriesController],
			providers: [PermissionCategoriesService],
		}).compile();

		controller = module.get<PermissionCategoriesController>(PermissionCategoriesController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
