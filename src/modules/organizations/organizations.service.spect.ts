import { Test, TestingModule } from "@nestjs/testing";
import { OrganizationsController } from "@modules/organizations/organizations.controller";
import { OrganizationsService } from "@modules/organizations/organizations.service";

describe("OrganizationsService", () => {
	let controller: OrganizationsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrganizationsController],
			providers: [OrganizationsService],
		}).compile();

		controller = module.get<OrganizationsController>(
			OrganizationsController,
		);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
