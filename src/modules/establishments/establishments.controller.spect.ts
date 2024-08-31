// import { Test, TestingModule } from "@nestjs/testing";
// import { EstablishmentsController } from "@modules/establishments/establishments.controller";
// import { EstablishmentsService } from "@modules/establishments/establishments.service";
// import { CreateEstablishmentDto } from "@modules/establishments/dto/create-establishment.dto";
// import { UpdateEstablishmentDto } from "@modules/establishments/dto/update-establishment.dto";
// import { Response } from "express";
// import { ValidationError } from "class-validator";

// describe("EstablishmentsController", () => {
// 	let controller: EstablishmentsController;
// 	let service: EstablishmentsService;

// 	const mockEstablishment = {
// 		_id: "1",
// 	};

// 	const mockEstablishmentsService = {
// 		create: jest
// 			.fn()
// 			.mockImplementation((dto: CreateEstablishmentDto) =>
// 				Promise.resolve({ _id: "1", ...dto }),
// 			),
// 		findAll: jest.fn().mockResolvedValue([mockEstablishment]),
// 		findOne: jest
// 			.fn()
// 			.mockImplementation((id: string) =>
// 				Promise.resolve({ _id: id, ...mockEstablishment }),
// 			),
// 		update: jest
// 			.fn()
// 			.mockImplementation((id: string, dto: UpdateEstablishmentDto) =>
// 				Promise.resolve({ _id: id, ...dto }),
// 			),
// 		remove: jest.fn().mockResolvedValue({ _id: "1", ...mockEstablishment }),
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
// 			controllers: [EstablishmentsController],
// 			providers: [
// 				{
// 					provide: EstablishmentsService,
// 					useValue: mockEstablishmentsService,
// 				},
// 			],
// 		}).compile();

// 		controller = module.get<EstablishmentsController>(
// 			EstablishmentsController,
// 		);
// 		service = module.get<EstablishmentsService>(EstablishmentsService);
// 	});

// 	it("should be defined", () => {
// 		expect(controller).toBeDefined();
// 	});

// 	/*
// 	 * Create
// 	 */
// 	it("Create [201] - should create a establishment", async () => {
// 		const dto: CreateEstablishmentDto = {};

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(201);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 201,
// 			datas: { establishments: { _id: "1", ...dto } },
// 			message: "establishments create with success",
// 			success: true,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	it("Create [422] - should handle validation errors when creating a establishment", async () => {
// 		const dto: CreateEstablishmentDto = {};

// 		const validationError = new ValidationError();
// 		validationError.property = "PROPERTY";
// 		validationError.constraints = { VALIDATOR: "VALIDATOR MESSAGE" };

// 		jest.spyOn(service, "create").mockRejectedValueOnce([validationError]);

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(422);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 422,
// 			datas: { establishments: [validationError] },
// 			message: "Validation errors occurred",
// 			success: false,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	it("Create [500] - should handle internal server errors when creating a establishment", async () => {
// 		const dto: CreateEstablishmentDto = {};

// 		jest.spyOn(service, "create").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { establishments: "Internal server error" },
// 			message: "An internal server error occurred",
// 			success: false,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	/*
// 	 * FindAll
// 	 */
// 	it("FindAll [200] - should return all establishments", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { establishments: [mockEstablishment] },
// 			message: "establishments retrieve with success",
// 			success: true,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	it("FindAll [404] - should handle not found error when returning all establishments", async () => {
// 		jest.spyOn(service, "findAll").mockResolvedValueOnce([]);

// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { establishments: "Not Found" },
// 			message: "establishments not found",
// 			success: false,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	it("FindAll [500] - should handle internal server errors when returning all establishments", async () => {
// 		jest.spyOn(service, "findAll").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { establishments: "Internal server error" },
// 			message: "establishments internal server error",
// 			success: false,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	/*
// 	 * FindOne
// 	 */
// 	it("FindOne [200] - should return a single establishment by id", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { establishments: { _id: "1", ...mockEstablishment } },
// 			message: "establishments retrieve with success",
// 			success: true,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("FindOne [404] - should handle not found error when returning a single establishment by id", async () => {
// 		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { establishments: "Not Found" },
// 			message: "establishments not found",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("FindOne [500] - should handle internal server errors when returning a single establishment by id", async () => {
// 		jest.spyOn(service, "findOne").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { establishments: "Internal server error" },
// 			message: "establishments internal server error",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	/*
// 	 * Update
// 	 */
// 	it("Update [404] - should handle not found error when updating a establishment by id", async () => {
// 		const dto: UpdateEstablishmentDto = { PROPERTY: "VALUE" };

// 		jest.spyOn(service, "update").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.update("1", dto, res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { establishments: "Not Found" },
// 			message: "establishments not found",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	it("Update [500] - should handle internal server errors when updating a establishment by id", async () => {
// 		const dto: UpdateEstablishmentDto = { PROPERTY: "VALUE" };

// 		jest.spyOn(service, "update").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.update("1", dto, res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { establishments: "Internal server error" },
// 			message: "establishments internal server error",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	it("Update [422] - should handle validation errors when updating a establishment by id", async () => {
// 		const dto: UpdateEstablishmentDto = { PROPERTY: "VALUE" };

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
// 			datas: { establishments: [validationError] },
// 			message: "Validation errors occurred",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	/*
// 	 * Delete
// 	 */
// 	it("Delete [200] - should delete a establishment by id", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { establishments: { removed: true } },
// 			message: "establishments delete with success",
// 			success: true,
// 		});
// 		expect(service.remove).toHaveBeenCalledWith("1");
// 	});

// 	it("Delete [404] - should handle not found error when deleting a establishment by id", async () => {
// 		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { establishments: {} },
// 			message: "establishments not found",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("Delete [500] - should handle internal server errors when deleting a establishment by id", async () => {
// 		jest.spyOn(service, "remove").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { establishments: "Internal server error" },
// 			message: "establishments internal server error",
// 			success: false,
// 		});
// 		expect(service.remove).toHaveBeenCalledWith("1");
// 	});
// });
