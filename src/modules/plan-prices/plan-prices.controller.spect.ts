// import { Test, TestingModule } from "@nestjs/testing";
// import { PlanPricesController } from "@modules/plan-prices/plan-prices.controller";
// import { PlanPricesService } from "@modules/plan-prices/plan-prices.service";
// import { CreatePlanPriceDto } from "@modules/plan-prices/dto/create-plan-price.dto";
// import { UpdatePlanPriceDto } from "@modules/plan-prices/dto/update-plan-price.dto";
// import { Response } from "express";
// import { ValidationError } from "class-validator";

// describe("PlanPricesController", () => {
// 	let controller: PlanPricesController;
// 	let service: PlanPricesService;

// 	const mockPlanPrice = {
// 		_id: "1",
// 	};

// 	const mockPlanPricesService = {
// 		create: jest
// 			.fn()
// 			.mockImplementation((dto: CreatePlanPriceDto) =>
// 				Promise.resolve({ _id: "1", ...dto }),
// 			),
// 		findAll: jest.fn().mockResolvedValue([mockPlanPrice]),
// 		findOne: jest
// 			.fn()
// 			.mockImplementation((id: string) =>
// 				Promise.resolve({ _id: id, ...mockPlanPrice }),
// 			),
// 		update: jest
// 			.fn()
// 			.mockImplementation((id: string, dto: UpdatePlanPriceDto) =>
// 				Promise.resolve({ _id: id, ...dto }),
// 			),
// 		remove: jest.fn().mockResolvedValue({ _id: "1", ...mockPlanPrice }),
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
// 			controllers: [PlanPricesController],
// 			providers: [
// 				{
// 					provide: PlanPricesService,
// 					useValue: mockPlanPricesService,
// 				},
// 			],
// 		}).compile();

// 		controller = module.get<PlanPricesController>(
// 			PlanPricesController,
// 		);
// 		service = module.get<PlanPricesService>(PlanPricesService);
// 	});

// 	it("should be defined", () => {
// 		expect(controller).toBeDefined();
// 	});

// 	/*
// 	 * Create
// 	 */
// 	it("Create [201] - should create a planPrice", async () => {
// 		const dto: CreatePlanPriceDto = {};

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(201);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 201,
// 			datas: { planPrices: { _id: "1", ...dto } },
// 			message: "planPrices create with success",
// 			success: true,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	it("Create [422] - should handle validation errors when creating a planPrice", async () => {
// 		const dto: CreatePlanPriceDto = {};

// 		const validationError = new ValidationError();
// 		validationError.property = "PROPERTY";
// 		validationError.constraints = { VALIDATOR: "VALIDATOR MESSAGE" };

// 		jest.spyOn(service, "create").mockRejectedValueOnce([validationError]);

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(422);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 422,
// 			datas: { planPrices: [validationError] },
// 			message: "Validation errors occurred",
// 			success: false,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	it("Create [500] - should handle internal server errors when creating a planPrice", async () => {
// 		const dto: CreatePlanPriceDto = {};

// 		jest.spyOn(service, "create").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { planPrices: "Internal server error" },
// 			message: "An internal server error occurred",
// 			success: false,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	/*
// 	 * FindAll
// 	 */
// 	it("FindAll [200] - should return all planPrices", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { planPrices: [mockPlanPrice] },
// 			message: "planPrices retrieve with success",
// 			success: true,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	it("FindAll [404] - should handle not found error when returning all planPrices", async () => {
// 		jest.spyOn(service, "findAll").mockResolvedValueOnce([]);

// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { planPrices: "Not Found" },
// 			message: "planPrices not found",
// 			success: false,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	it("FindAll [500] - should handle internal server errors when returning all planPrices", async () => {
// 		jest.spyOn(service, "findAll").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { planPrices: "Internal server error" },
// 			message: "planPrices internal server error",
// 			success: false,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	/*
// 	 * FindOne
// 	 */
// 	it("FindOne [200] - should return a single planPrice by id", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { planPrices: { _id: "1", ...mockPlanPrice } },
// 			message: "planPrices retrieve with success",
// 			success: true,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("FindOne [404] - should handle not found error when returning a single planPrice by id", async () => {
// 		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { planPrices: "Not Found" },
// 			message: "planPrices not found",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("FindOne [500] - should handle internal server errors when returning a single planPrice by id", async () => {
// 		jest.spyOn(service, "findOne").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { planPrices: "Internal server error" },
// 			message: "planPrices internal server error",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	/*
// 	 * Update
// 	 */
// 	it("Update [404] - should handle not found error when updating a planPrice by id", async () => {
// 		const dto: UpdatePlanPriceDto = { PROPERTY: "VALUE" };

// 		jest.spyOn(service, "update").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.update("1", dto, res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { planPrices: "Not Found" },
// 			message: "planPrices not found",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	it("Update [500] - should handle internal server errors when updating a planPrice by id", async () => {
// 		const dto: UpdatePlanPriceDto = { PROPERTY: "VALUE" };

// 		jest.spyOn(service, "update").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.update("1", dto, res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { planPrices: "Internal server error" },
// 			message: "planPrices internal server error",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	it("Update [422] - should handle validation errors when updating a planPrice by id", async () => {
// 		const dto: UpdatePlanPriceDto = { PROPERTY: "VALUE" };

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
// 			datas: { planPrices: [validationError] },
// 			message: "Validation errors occurred",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	/*
// 	 * Delete
// 	 */
// 	it("Delete [200] - should delete a planPrice by id", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { planPrices: { removed: true } },
// 			message: "planPrices delete with success",
// 			success: true,
// 		});
// 		expect(service.remove).toHaveBeenCalledWith("1");
// 	});

// 	it("Delete [404] - should handle not found error when deleting a planPrice by id", async () => {
// 		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { planPrices: {} },
// 			message: "planPrices not found",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("Delete [500] - should handle internal server errors when deleting a planPrice by id", async () => {
// 		jest.spyOn(service, "remove").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { planPrices: "Internal server error" },
// 			message: "planPrices internal server error",
// 			success: false,
// 		});
// 		expect(service.remove).toHaveBeenCalledWith("1");
// 	});
// });
