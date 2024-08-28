import { Test, TestingModule } from "@nestjs/testing";
import { TeamsController } from "@modules/teams/teams.controller";
import { TeamsService } from "@modules/teams/teams.service";

describe("TeamsService", () => {
	let controller: TeamsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TeamsController],
			providers: [TeamsService],
		}).compile();

		controller = module.get<TeamsController>(TeamsController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
