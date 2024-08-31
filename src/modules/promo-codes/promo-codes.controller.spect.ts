// import { Test, TestingModule } from "@nestjs/testing";
// import { PromoCodesController } from "@modules/promo-codes/promo-codes.controller";
// import { PromoCodesService } from "@modules/promo-codes/promo-codes.service";
// import { CreatePromoCodeDto } from "@modules/promo-codes/dto/create-promo-code.dto";
// import { UpdatePromoCodeDto } from "@modules/promo-codes/dto/update-promo-code.dto";
// import { Response } from "express";
// import { ValidationError } from "class-validator";

// describe("PromoCodesController", () => {
// 	let controller: PromoCodesController;
// 	let service: PromoCodesService;

// 	const mockPromoCode = {
// 		_id: "1",
// 	};

// 	const mockPromoCodesService = {
// 		create: jest
// 			.fn()
// 			.mockImplementation((dto: CreatePromoCodeDto) =>
// 				Promise.resolve({ _id: "1", ...dto }),
// 			),
// 		findAll: jest.fn().mockResolvedValue([mockPromoCode]),
// 		findOne: jest
// 			.fn()
// 			.mockImplementation((id: string) =>
// 				Promise.resolve({ _id: id, ...mockPromoCode }),
// 			),
// 		update: jest
// 			.fn()
// 			.mockImplementation((id: string, dto: UpdatePromoCodeDto) =>
// 				Promise.resolve({ _id: id, ...dto }),
// 			),
// 		remove: jest.fn().mockResolvedValue({ _id: "1", ...mockPromoCode }),
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
// 			controllers: [PromoCodesController],
// 			providers: [
// 				{
// 					provide: PromoCodesService,
// 					useValue: mockPromoCodesService,
// 				},
// 			],
// 		}).compile();

// 		controller = module.get<PromoCodesController>(PromoCodesController);
// 		service = module.get<PromoCodesService>(PromoCodesService);
// 	});

// 	it("should be defined", () => {
// 		expect(controller).toBeDefined();
// 	});

// 	/*
// 	 * Create
// 	 */
// 	it("Create [201] - should create a promoCode", async () => {
// 		const dto: CreatePromoCodeDto = {};

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(201);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 201,
// 			datas: { promoCodes: { _id: "1", ...dto } },
// 			message: "promoCodes create with success",
// 			success: true,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	it("Create [422] - should handle validation errors when creating a promoCode", async () => {
// 		const dto: CreatePromoCodeDto = {};

// 		const validationError = new ValidationError();
// 		validationError.property = "PROPERTY";
// 		validationError.constraints = { VALIDATOR: "VALIDATOR MESSAGE" };

// 		jest.spyOn(service, "create").mockRejectedValueOnce([validationError]);

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(422);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 422,
// 			datas: { promoCodes: [validationError] },
// 			message: "Validation errors occurred",
// 			success: false,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	it("Create [500] - should handle internal server errors when creating a promoCode", async () => {
// 		const dto: CreatePromoCodeDto = {};

// 		jest.spyOn(service, "create").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { promoCodes: "Internal server error" },
// 			message: "An internal server error occurred",
// 			success: false,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	/*
// 	 * FindAll
// 	 */
// 	it("FindAll [200] - should return all promoCodes", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { promoCodes: [mockPromoCode] },
// 			message: "promoCodes retrieve with success",
// 			success: true,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	it("FindAll [404] - should handle not found error when returning all promoCodes", async () => {
// 		jest.spyOn(service, "findAll").mockResolvedValueOnce([]);

// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { promoCodes: "Not Found" },
// 			message: "promoCodes not found",
// 			success: false,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	it("FindAll [500] - should handle internal server errors when returning all promoCodes", async () => {
// 		jest.spyOn(service, "findAll").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { promoCodes: "Internal server error" },
// 			message: "promoCodes internal server error",
// 			success: false,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	/*
// 	 * FindOne
// 	 */
// 	it("FindOne [200] - should return a single promoCode by id", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { promoCodes: { _id: "1", ...mockPromoCode } },
// 			message: "promoCodes retrieve with success",
// 			success: true,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("FindOne [404] - should handle not found error when returning a single promoCode by id", async () => {
// 		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { promoCodes: "Not Found" },
// 			message: "promoCodes not found",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("FindOne [500] - should handle internal server errors when returning a single promoCode by id", async () => {
// 		jest.spyOn(service, "findOne").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { promoCodes: "Internal server error" },
// 			message: "promoCodes internal server error",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	/*
// 	 * Update
// 	 */
// 	it("Update [404] - should handle not found error when updating a promoCode by id", async () => {
// 		const dto: UpdatePromoCodeDto = { PROPERTY: "VALUE" };

// 		jest.spyOn(service, "update").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.update("1", dto, res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { promoCodes: "Not Found" },
// 			message: "promoCodes not found",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	it("Update [500] - should handle internal server errors when updating a promoCode by id", async () => {
// 		const dto: UpdatePromoCodeDto = { PROPERTY: "VALUE" };

// 		jest.spyOn(service, "update").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.update("1", dto, res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { promoCodes: "Internal server error" },
// 			message: "promoCodes internal server error",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	it("Update [422] - should handle validation errors when updating a promoCode by id", async () => {
// 		const dto: UpdatePromoCodeDto = { PROPERTY: "VALUE" };

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
// 			datas: { promoCodes: [validationError] },
// 			message: "Validation errors occurred",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	/*
// 	 * Delete
// 	 */
// 	it("Delete [200] - should delete a promoCode by id", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { promoCodes: { removed: true } },
// 			message: "promoCodes delete with success",
// 			success: true,
// 		});
// 		expect(service.remove).toHaveBeenCalledWith("1");
// 	});

// 	it("Delete [404] - should handle not found error when deleting a promoCode by id", async () => {
// 		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { promoCodes: {} },
// 			message: "promoCodes not found",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("Delete [500] - should handle internal server errors when deleting a promoCode by id", async () => {
// 		jest.spyOn(service, "remove").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { promoCodes: "Internal server error" },
// 			message: "promoCodes internal server error",
// 			success: false,
// 		});
// 		expect(service.remove).toHaveBeenCalledWith("1");
// 	});
// });
