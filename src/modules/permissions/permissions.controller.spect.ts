import { Test, TestingModule } from "@nestjs/testing";
import { PermissionsController } from "@modules/permissions/permissions.controller";
import { PermissionsService } from "@modules/permissions/permissions.service";
import { CreatePermissionDto } from "@modules/permissions/dto/create-permission.dto";
import { UpdatePermissionDto } from "@modules/permissions/dto/update-permission.dto";
import { Response } from "express";
import { ValidationError } from "class-validator";

describe("PermissionsController", () => {
	let controller: PermissionsController;
	let service: PermissionsService;

	const mockPermission = {
		_id: "1",
	};

	const mockPermissionsService = {
		create: jest
			.fn()
			.mockImplementation((dto: CreatePermissionDto) =>
				Promise.resolve({ _id: "1", ...dto }),
			),
		findAll: jest.fn().mockResolvedValue([mockPermission]),
		findOne: jest
			.fn()
			.mockImplementation((id: string) =>
				Promise.resolve({ _id: id, ...mockPermission }),
			),
		update: jest
			.fn()
			.mockImplementation((id: string, dto: UpdatePermissionDto) =>
				Promise.resolve({ _id: id, ...dto }),
			),
		remove: jest.fn().mockResolvedValue({ _id: "1", ...mockPermission }),
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
			controllers: [PermissionsController],
			providers: [
				{
					provide: PermissionsService,
					useValue: mockPermissionsService,
				},
			],
		}).compile();

		controller = module.get<PermissionsController>(
			PermissionsController,
		);
		service = module.get<PermissionsService>(PermissionsService);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	/*
	 * Create
	 */
	it("Create [201] - should create a permission", async () => {
		const dto: CreatePermissionDto = {};

		const res = mockResponse() as Response;

		await controller.create(dto, res);

		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({
			code: 201,
			datas: { permissions: { _id: "1", ...dto } },
			message: "permissions create with success",
			success: true,
		});
		expect(service.create).toHaveBeenCalledWith(dto);
	});

	it("Create [422] - should handle validation errors when creating a permission", async () => {
		const dto: CreatePermissionDto = {};

		const validationError = new ValidationError();
		validationError.property = "PROPERTY";
		validationError.constraints = { VALIDATOR: "VALIDATOR MESSAGE" };

		jest.spyOn(service, "create").mockRejectedValueOnce([validationError]);

		const res = mockResponse() as Response;

		await controller.create(dto, res);

		expect(res.status).toHaveBeenCalledWith(422);
		expect(res.json).toHaveBeenCalledWith({
			code: 422,
			datas: { permissions: [validationError] },
			message: "Validation errors occurred",
			success: false,
		});
		expect(service.create).toHaveBeenCalledWith(dto);
	});

	it("Create [500] - should handle internal server errors when creating a permission", async () => {
		const dto: CreatePermissionDto = {};

		jest.spyOn(service, "create").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.create(dto, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { permissions: "Internal server error" },
			message: "An internal server error occurred",
			success: false,
		});
		expect(service.create).toHaveBeenCalledWith(dto);
	});

	/*
	 * FindAll
	 */
	it("FindAll [200] - should return all permissions", async () => {
		const res = mockResponse() as Response;

		await controller.findAll(res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			datas: { permissions: [mockPermission] },
			message: "permissions retrieve with success",
			success: true,
		});
		expect(service.findAll).toHaveBeenCalled();
	});

	it("FindAll [404] - should handle not found error when returning all permissions", async () => {
		jest.spyOn(service, "findAll").mockResolvedValueOnce([]);

		const res = mockResponse() as Response;

		await controller.findAll(res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { permissions: "Not Found" },
			message: "permissions not found",
			success: false,
		});
		expect(service.findAll).toHaveBeenCalled();
	});

	it("FindAll [500] - should handle internal server errors when returning all permissions", async () => {
		jest.spyOn(service, "findAll").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.findAll(res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { permissions: "Internal server error" },
			message: "permissions internal server error",
			success: false,
		});
		expect(service.findAll).toHaveBeenCalled();
	});

	/*
	 * FindOne
	 */
	it("FindOne [200] - should return a single permission by id", async () => {
		const res = mockResponse() as Response;

		await controller.findOne("1", res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			datas: { permissions: { _id: "1", ...mockPermission } },
			message: "permissions retrieve with success",
			success: true,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	it("FindOne [404] - should handle not found error when returning a single permission by id", async () => {
		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

		const res = mockResponse() as Response;

		await controller.findOne("1", res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { permissions: "Not Found" },
			message: "permissions not found",
			success: false,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	it("FindOne [500] - should handle internal server errors when returning a single permission by id", async () => {
		jest.spyOn(service, "findOne").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.findOne("1", res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { permissions: "Internal server error" },
			message: "permissions internal server error",
			success: false,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	/*
	 * Update
	 */
	it("Update [404] - should handle not found error when updating a permission by id", async () => {
		const dto: UpdatePermissionDto = { PROPERTY: "VALUE" };

		jest.spyOn(service, "update").mockResolvedValueOnce(null);

		const res = mockResponse() as Response;

		await controller.update("1", dto, res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { permissions: "Not Found" },
			message: "permissions not found",
			success: false,
		});
		expect(service.update).toHaveBeenCalledWith("1", dto);
	});

	it("Update [500] - should handle internal server errors when updating a permission by id", async () => {
		const dto: UpdatePermissionDto = { PROPERTY: "VALUE" };

		jest.spyOn(service, "update").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.update("1", dto, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { permissions: "Internal server error" },
			message: "permissions internal server error",
			success: false,
		});
		expect(service.update).toHaveBeenCalledWith("1", dto);
	});

	it("Update [422] - should handle validation errors when updating a permission by id", async () => {
		const dto: UpdatePermissionDto = { PROPERTY: "VALUE" };

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
			datas: { permissions: [validationError] },
			message: "Validation errors occurred",
			success: false,
		});
		expect(service.update).toHaveBeenCalledWith("1", dto);
	});

	/*
	 * Delete
	 */
	it("Delete [200] - should delete a permission by id", async () => {
		const res = mockResponse() as Response;

		await controller.remove("1", res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			datas: { permissions: { removed: true } },
			message: "permissions delete with success",
			success: true,
		});
		expect(service.remove).toHaveBeenCalledWith("1");
	});

	it("Delete [404] - should handle not found error when deleting a permission by id", async () => {
		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

		const res = mockResponse() as Response;

		await controller.remove("1", res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { permissions: {} },
			message: "permissions not found",
			success: false,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	it("Delete [500] - should handle internal server errors when deleting a permission by id", async () => {
		jest.spyOn(service, "remove").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.remove("1", res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { permissions: "Internal server error" },
			message: "permissions internal server error",
			success: false,
		});
		expect(service.remove).toHaveBeenCalledWith("1");
	});
});
