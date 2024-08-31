// import { Test, TestingModule } from "@nestjs/testing";
// import { TeamsController } from "@modules/teams/teams.controller";
// import { TeamsService } from "@modules/teams/teams.service";
// import { CreateTeamDto } from "@modules/teams/dto/create-team.dto";
// import { UpdateTeamDto } from "@modules/teams/dto/update-team.dto";
// import { Response } from "express";
// import { ValidationError } from "class-validator";

// describe("TeamsController", () => {
// 	let controller: TeamsController;
// 	let service: TeamsService;

// 	const mockTeam = {
// 		_id: "1",
// 	};

// 	const mockTeamsService = {
// 		create: jest
// 			.fn()
// 			.mockImplementation((dto: CreateTeamDto) =>
// 				Promise.resolve({ _id: "1", ...dto }),
// 			),
// 		findAll: jest.fn().mockResolvedValue([mockTeam]),
// 		findOne: jest
// 			.fn()
// 			.mockImplementation((id: string) =>
// 				Promise.resolve({ _id: id, ...mockTeam }),
// 			),
// 		update: jest
// 			.fn()
// 			.mockImplementation((id: string, dto: UpdateTeamDto) =>
// 				Promise.resolve({ _id: id, ...dto }),
// 			),
// 		remove: jest.fn().mockResolvedValue({ _id: "1", ...mockTeam }),
// 	};

// 	function mockResponse(): Partial<Response> {
// 		const res: Partial<Response> = {
// 			status: jest.fn().mockReturnThis(),
// 			json: jest.fn().mockReturnThis(),
// 		};
// 		return res;
// 	}

// 	/*
// 	function mockRequest(customerId: string): Partial<Request> {
// 		return {
// 			customer: { _id: customerId },
// 		} as Partial<Request>;
// 	}
// 	*/

// 	beforeEach(async () => {
// 		const module: TestingModule = await Test.createTestingModule({
// 			controllers: [TeamsController],
// 			providers: [
// 				{
// 					provide: TeamsService,
// 					useValue: mockTeamsService,
// 				},
// 			],
// 		}).compile();

// 		controller = module.get<TeamsController>(TeamsController);
// 		service = module.get<TeamsService>(TeamsService);
// 	});

// 	it("should be defined", () => {
// 		expect(controller).toBeDefined();
// 	});

// 	/*
// 	 * Create
// 	 */
// 	it("Create [201] - should create a team", async () => {
// 		const dto: CreateTeamDto = {};

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(201);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 201,
// 			datas: { teams: { _id: "1", ...dto } },
// 			message: "teams create with success",
// 			success: true,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	it("Create [422] - should handle validation errors when creating a team", async () => {
// 		const dto: CreateTeamDto = {};

// 		const validationError = new ValidationError();
// 		validationError.property = "PROPERTY";
// 		validationError.constraints = { VALIDATOR: "VALIDATOR MESSAGE" };

// 		jest.spyOn(service, "create").mockRejectedValueOnce([validationError]);

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(422);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 422,
// 			datas: { teams: [validationError] },
// 			message: "Validation errors occurred",
// 			success: false,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	it("Create [500] - should handle internal server errors when creating a team", async () => {
// 		const dto: CreateTeamDto = {};

// 		jest.spyOn(service, "create").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { teams: "Internal server error" },
// 			message: "An internal server error occurred",
// 			success: false,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	/*
// 	 * FindAll
// 	 */
// 	it("FindAll [200] - should return all teams", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { teams: [mockTeam] },
// 			message: "teams retrieve with success",
// 			success: true,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	it("FindAll [404] - should handle not found error when returning all teams", async () => {
// 		jest.spyOn(service, "findAll").mockResolvedValueOnce([]);

// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { teams: "Not Found" },
// 			message: "teams not found",
// 			success: false,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	it("FindAll [500] - should handle internal server errors when returning all teams", async () => {
// 		jest.spyOn(service, "findAll").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { teams: "Internal server error" },
// 			message: "teams internal server error",
// 			success: false,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	/*
// 	 * FindOne
// 	 */
// 	it("FindOne [200] - should return a single team by id", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { teams: { _id: "1", ...mockTeam } },
// 			message: "teams retrieve with success",
// 			success: true,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("FindOne [404] - should handle not found error when returning a single team by id", async () => {
// 		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { teams: "Not Found" },
// 			message: "teams not found",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("FindOne [500] - should handle internal server errors when returning a single team by id", async () => {
// 		jest.spyOn(service, "findOne").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { teams: "Internal server error" },
// 			message: "teams internal server error",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	/*
// 	 * Update
// 	 */
// 	it("Update [404] - should handle not found error when updating a team by id", async () => {
// 		const dto: UpdateTeamDto = { PROPERTY: "VALUE" };

// 		jest.spyOn(service, "update").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.update("1", dto, res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { teams: "Not Found" },
// 			message: "teams not found",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	it("Update [500] - should handle internal server errors when updating a team by id", async () => {
// 		const dto: UpdateTeamDto = { PROPERTY: "VALUE" };

// 		jest.spyOn(service, "update").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.update("1", dto, res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { teams: "Internal server error" },
// 			message: "teams internal server error",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	it("Update [422] - should handle validation errors when updating a team by id", async () => {
// 		const dto: UpdateTeamDto = { PROPERTY: "VALUE" };

// 		const validationError = new ValidationError();
// 		validationError.property = "PROPERTY";
// 		validationError.constraints = {
// 			isString: "PROPERTY must be a string",
// 		};

// 		jest.spyOn(service, "update").mockRejectedValueOnce([validationError]);

// 		const res = mockResponse() as Response;

// 		await controller.update("1", dto, res);

// 		expect(res.status).toHaveBeenCalledWith(422);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 422,
// 			datas: { teams: [validationError] },
// 			message: "Validation errors occurred",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	/*
// 	 * Delete
// 	 */
// 	it("Delete [200] - should delete a team by id", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { teams: { removed: true } },
// 			message: "teams delete with success",
// 			success: true,
// 		});
// 		expect(service.remove).toHaveBeenCalledWith("1");
// 	});

// 	it("Delete [404] - should handle not found error when deleting a team by id", async () => {
// 		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { teams: {} },
// 			message: "teams not found",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("Delete [500] - should handle internal server errors when deleting a team by id", async () => {
// 		jest.spyOn(service, "remove").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { teams: "Internal server error" },
// 			message: "teams internal server error",
// 			success: false,
// 		});
// 		expect(service.remove).toHaveBeenCalledWith("1");
// 	});
// });
