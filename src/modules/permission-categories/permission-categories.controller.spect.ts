import { Test, TestingModule } from "@nestjs/testing";
import { PermissionCategoriesController } from "@modules/permission-categories/permission-categories.controller";
import { PermissionCategoriesService } from "@modules/permission-categories/permission-categories.service";
import { CreatePermissionCategorieDto } from "@modules/permission-categories/dto/create-permission-categorie.dto";
import { UpdatePermissionCategorieDto } from "@modules/permission-categories/dto/update-permission-categorie.dto";
import { Response } from "express";
import { ValidationError } from "class-validator";

describe("PermissionCategoriesController", () => {
	let controller: PermissionCategoriesController;
	let service: PermissionCategoriesService;

	const mockPermissionCategorie = {
		_id: "1",
	};

	const mockPermissionCategoriesService = {
		create: jest
			.fn()
			.mockImplementation((dto: CreatePermissionCategorieDto) =>
				Promise.resolve({ _id: "1", ...dto }),
			),
		findAll: jest.fn().mockResolvedValue([mockPermissionCategorie]),
		findOne: jest
			.fn()
			.mockImplementation((id: string) =>
				Promise.resolve({ _id: id, ...mockPermissionCategorie }),
			),
		update: jest
			.fn()
			.mockImplementation((id: string, dto: UpdatePermissionCategorieDto) =>
				Promise.resolve({ _id: id, ...dto }),
			),
		remove: jest.fn().mockResolvedValue({ _id: "1", ...mockPermissionCategorie }),
	};

	function mockResponse(): Partial<Response> {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
		};
		return res;
	}

	/*
	function mockRequest(customerId: string): Partial<Request> {
		return {
			customer: { _id: customerId },
		} as Partial<Request>;
	}
	*/

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PermissionCategoriesController],
			providers: [
				{
					provide: PermissionCategoriesService,
					useValue: mockPermissionCategoriesService,
				},
			],
		}).compile();

		controller = module.get<PermissionCategoriesController>(
			PermissionCategoriesController,
		);
		service = module.get<PermissionCategoriesService>(PermissionCategoriesService);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	/*
	 * Create
	 */
	it("Create [201] - should create a permissionCategorie", async () => {
		const dto: CreatePermissionCategorieDto = {};

		const res = mockResponse() as Response;

		await controller.create(dto, res);

		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({
			code: 201,
			datas: { permissionCategories: { _id: "1", ...dto } },
			message: "permissionCategories create with success",
			success: true,
		});
		expect(service.create).toHaveBeenCalledWith(dto);
	});

	it("Create [422] - should handle validation errors when creating a permissionCategorie", async () => {
		const dto: CreatePermissionCategorieDto = {};

		const validationError = new ValidationError();
		validationError.property = "PROPERTY";
		validationError.constraints = { VALIDATOR: "VALIDATOR MESSAGE" };

		jest.spyOn(service, "create").mockRejectedValueOnce([validationError]);

		const res = mockResponse() as Response;

		await controller.create(dto, res);

		expect(res.status).toHaveBeenCalledWith(422);
		expect(res.json).toHaveBeenCalledWith({
			code: 422,
			datas: { permissionCategories: [validationError] },
			message: "Validation errors occurred",
			success: false,
		});
		expect(service.create).toHaveBeenCalledWith(dto);
	});

	it("Create [500] - should handle internal server errors when creating a permissionCategorie", async () => {
		const dto: CreatePermissionCategorieDto = {};

		jest.spyOn(service, "create").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.create(dto, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { permissionCategories: "Internal server error" },
			message: "An internal server error occurred",
			success: false,
		});
		expect(service.create).toHaveBeenCalledWith(dto);
	});

	/*
	 * FindAll
	 */
	it("FindAll [200] - should return all permissionCategories", async () => {
		const res = mockResponse() as Response;

		await controller.findAll(res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			datas: { permissionCategories: [mockPermissionCategorie] },
			message: "permissionCategories retrieve with success",
			success: true,
		});
		expect(service.findAll).toHaveBeenCalled();
	});

	it("FindAll [404] - should handle not found error when returning all permissionCategories", async () => {
		jest.spyOn(service, "findAll").mockResolvedValueOnce([]);

		const res = mockResponse() as Response;

		await controller.findAll(res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { permissionCategories: "Not Found" },
			message: "permissionCategories not found",
			success: false,
		});
		expect(service.findAll).toHaveBeenCalled();
	});

	it("FindAll [500] - should handle internal server errors when returning all permissionCategories", async () => {
		jest.spyOn(service, "findAll").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.findAll(res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { permissionCategories: "Internal server error" },
			message: "permissionCategories internal server error",
			success: false,
		});
		expect(service.findAll).toHaveBeenCalled();
	});

	/*
	 * FindOne
	 */
	it("FindOne [200] - should return a single permissionCategorie by id", async () => {
		const res = mockResponse() as Response;

		await controller.findOne("1", res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			datas: { permissionCategories: { _id: "1", ...mockPermissionCategorie } },
			message: "permissionCategories retrieve with success",
			success: true,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	it("FindOne [404] - should handle not found error when returning a single permissionCategorie by id", async () => {
		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

		const res = mockResponse() as Response;

		await controller.findOne("1", res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { permissionCategories: "Not Found" },
			message: "permissionCategories not found",
			success: false,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	it("FindOne [500] - should handle internal server errors when returning a single permissionCategorie by id", async () => {
		jest.spyOn(service, "findOne").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.findOne("1", res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { permissionCategories: "Internal server error" },
			message: "permissionCategories internal server error",
			success: false,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	/*
	 * Update
	 */
	it("Update [404] - should handle not found error when updating a permissionCategorie by id", async () => {
		const dto: UpdatePermissionCategorieDto = { PROPERTY: "VALUE" };

		jest.spyOn(service, "update").mockResolvedValueOnce(null);

		const res = mockResponse() as Response;

		await controller.update("1", dto, res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { permissionCategories: "Not Found" },
			message: "permissionCategories not found",
			success: false,
		});
		expect(service.update).toHaveBeenCalledWith("1", dto);
	});

	it("Update [500] - should handle internal server errors when updating a permissionCategorie by id", async () => {
		const dto: UpdatePermissionCategorieDto = { PROPERTY: "VALUE" };

		jest.spyOn(service, "update").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.update("1", dto, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { permissionCategories: "Internal server error" },
			message: "permissionCategories internal server error",
			success: false,
		});
		expect(service.update).toHaveBeenCalledWith("1", dto);
	});

	it("Update [422] - should handle validation errors when updating a permissionCategorie by id", async () => {
		const dto: UpdatePermissionCategorieDto = { PROPERTY: "VALUE" };

		const validationError = new ValidationError();
		validationError.property = "PROPERTY";
		validationError.constraints = {
			isString: "PROPERTY must be a string",
		};

		jest.spyOn(service, "update").mockRejectedValueOnce([validationError]);

		const res = mockResponse() as Response;

		await controller.update("1", dto, res);

		expect(res.status).toHaveBeenCalledWith(422);
		expect(res.json).toHaveBeenCalledWith({
			code: 422,
			datas: { permissionCategories: [validationError] },
			message: "Validation errors occurred",
			success: false,
		});
		expect(service.update).toHaveBeenCalledWith("1", dto);
	});

	/*
	 * Delete
	 */
	it("Delete [200] - should delete a permissionCategorie by id", async () => {
		const res = mockResponse() as Response;

		await controller.remove("1", res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			datas: { permissionCategories: { removed: true } },
			message: "permissionCategories delete with success",
			success: true,
		});
		expect(service.remove).toHaveBeenCalledWith("1");
	});

	it("Delete [404] - should handle not found error when deleting a permissionCategorie by id", async () => {
		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

		const res = mockResponse() as Response;

		await controller.remove("1", res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { permissionCategories: {} },
			message: "permissionCategories not found",
			success: false,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	it("Delete [500] - should handle internal server errors when deleting a permissionCategorie by id", async () => {
		jest.spyOn(service, "remove").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.remove("1", res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { permissionCategories: "Internal server error" },
			message: "permissionCategories internal server error",
			success: false,
		});
		expect(service.remove).toHaveBeenCalledWith("1");
	});
});
