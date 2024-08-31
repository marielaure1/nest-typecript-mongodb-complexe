// import { Test, TestingModule } from "@nestjs/testing";
// import { BookerEmployeesController } from "@modules/booker-employees/booker-employees.controller";
// import { BookerEmployeesService } from "@modules/booker-employees/booker-employees.service";
// import { CreateBookerEmployeeDto } from "@modules/booker-employees/dto/create-booker-employee.dto";
// import { UpdateBookerEmployeeDto } from "@modules/booker-employees/dto/update-booker-employee.dto";
// import { Response } from "express";
// import { ValidationError } from "class-validator";

// describe("BookerEmployeesController", () => {
// 	let controller: BookerEmployeesController;
// 	let service: BookerEmployeesService;

// 	const mockBookerEmployee = {
// 		_id: "1",
// 	};

// 	const mockBookerEmployeesService = {
// 		create: jest
// 			.fn()
// 			.mockImplementation((dto: CreateBookerEmployeeDto) =>
// 				Promise.resolve({ _id: "1", ...dto }),
// 			),
// 		findAll: jest.fn().mockResolvedValue([mockBookerEmployee]),
// 		findOne: jest
// 			.fn()
// 			.mockImplementation((id: string) =>
// 				Promise.resolve({ _id: id, ...mockBookerEmployee }),
// 			),
// 		update: jest
// 			.fn()
// 			.mockImplementation((id: string, dto: UpdateBookerEmployeeDto) =>
// 				Promise.resolve({ _id: id, ...dto }),
// 			),
// 		remove: jest.fn().mockResolvedValue({ _id: "1", ...mockBookerEmployee }),
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
// 			controllers: [BookerEmployeesController],
// 			providers: [
// 				{
// 					provide: BookerEmployeesService,
// 					useValue: mockBookerEmployeesService,
// 				},
// 			],
// 		}).compile();

// 		controller = module.get<BookerEmployeesController>(
// 			BookerEmployeesController,
// 		);
// 		service = module.get<BookerEmployeesService>(BookerEmployeesService);
// 	});

// 	it("should be defined", () => {
// 		expect(controller).toBeDefined();
// 	});

// 	/*
// 	 * Create
// 	 */
// 	it("Create [201] - should create a bookerEmployee", async () => {
// 		const dto: CreateBookerEmployeeDto = {};

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(201);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 201,
// 			datas: { bookerEmployees: { _id: "1", ...dto } },
// 			message: "bookerEmployees create with success",
// 			success: true,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	it("Create [422] - should handle validation errors when creating a bookerEmployee", async () => {
// 		const dto: CreateBookerEmployeeDto = {};

// 		const validationError = new ValidationError();
// 		validationError.property = "PROPERTY";
// 		validationError.constraints = { VALIDATOR: "VALIDATOR MESSAGE" };

// 		jest.spyOn(service, "create").mockRejectedValueOnce([validationError]);

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(422);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 422,
// 			datas: { bookerEmployees: [validationError] },
// 			message: "Validation errors occurred",
// 			success: false,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	it("Create [500] - should handle internal server errors when creating a bookerEmployee", async () => {
// 		const dto: CreateBookerEmployeeDto = {};

// 		jest.spyOn(service, "create").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.create(dto, res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { bookerEmployees: "Internal server error" },
// 			message: "An internal server error occurred",
// 			success: false,
// 		});
// 		expect(service.create).toHaveBeenCalledWith(dto);
// 	});

// 	/*
// 	 * FindAll
// 	 */
// 	it("FindAll [200] - should return all bookerEmployees", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { bookerEmployees: [mockBookerEmployee] },
// 			message: "bookerEmployees retrieve with success",
// 			success: true,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	it("FindAll [404] - should handle not found error when returning all bookerEmployees", async () => {
// 		jest.spyOn(service, "findAll").mockResolvedValueOnce([]);

// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { bookerEmployees: "Not Found" },
// 			message: "bookerEmployees not found",
// 			success: false,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	it("FindAll [500] - should handle internal server errors when returning all bookerEmployees", async () => {
// 		jest.spyOn(service, "findAll").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.findAll(res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { bookerEmployees: "Internal server error" },
// 			message: "bookerEmployees internal server error",
// 			success: false,
// 		});
// 		expect(service.findAll).toHaveBeenCalled();
// 	});

// 	/*
// 	 * FindOne
// 	 */
// 	it("FindOne [200] - should return a single bookerEmployee by id", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { bookerEmployees: { _id: "1", ...mockBookerEmployee } },
// 			message: "bookerEmployees retrieve with success",
// 			success: true,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("FindOne [404] - should handle not found error when returning a single bookerEmployee by id", async () => {
// 		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { bookerEmployees: "Not Found" },
// 			message: "bookerEmployees not found",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("FindOne [500] - should handle internal server errors when returning a single bookerEmployee by id", async () => {
// 		jest.spyOn(service, "findOne").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.findOne("1", res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { bookerEmployees: "Internal server error" },
// 			message: "bookerEmployees internal server error",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	/*
// 	 * Update
// 	 */
// 	it("Update [404] - should handle not found error when updating a bookerEmployee by id", async () => {
// 		const dto: UpdateBookerEmployeeDto = { PROPERTY: "VALUE" };

// 		jest.spyOn(service, "update").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.update("1", dto, res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { bookerEmployees: "Not Found" },
// 			message: "bookerEmployees not found",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	it("Update [500] - should handle internal server errors when updating a bookerEmployee by id", async () => {
// 		const dto: UpdateBookerEmployeeDto = { PROPERTY: "VALUE" };

// 		jest.spyOn(service, "update").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.update("1", dto, res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { bookerEmployees: "Internal server error" },
// 			message: "bookerEmployees internal server error",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	it("Update [422] - should handle validation errors when updating a bookerEmployee by id", async () => {
// 		const dto: UpdateBookerEmployeeDto = { PROPERTY: "VALUE" };

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
// 			datas: { bookerEmployees: [validationError] },
// 			message: "Validation errors occurred",
// 			success: false,
// 		});
// 		expect(service.update).toHaveBeenCalledWith("1", dto);
// 	});

// 	/*
// 	 * Delete
// 	 */
// 	it("Delete [200] - should delete a bookerEmployee by id", async () => {
// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 200,
// 			datas: { bookerEmployees: { removed: true } },
// 			message: "bookerEmployees delete with success",
// 			success: true,
// 		});
// 		expect(service.remove).toHaveBeenCalledWith("1");
// 	});

// 	it("Delete [404] - should handle not found error when deleting a bookerEmployee by id", async () => {
// 		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 404,
// 			datas: { bookerEmployees: {} },
// 			message: "bookerEmployees not found",
// 			success: false,
// 		});
// 		expect(service.findOne).toHaveBeenCalledWith("1");
// 	});

// 	it("Delete [500] - should handle internal server errors when deleting a bookerEmployee by id", async () => {
// 		jest.spyOn(service, "remove").mockRejectedValueOnce(
// 			new Error("Internal server error"),
// 		);

// 		const res = mockResponse() as Response;

// 		await controller.remove("1", res);

// 		expect(res.status).toHaveBeenCalledWith(500);
// 		expect(res.json).toHaveBeenCalledWith({
// 			code: 500,
// 			datas: { bookerEmployees: "Internal server error" },
// 			message: "bookerEmployees internal server error",
// 			success: false,
// 		});
// 		expect(service.remove).toHaveBeenCalledWith("1");
// 	});
// });
