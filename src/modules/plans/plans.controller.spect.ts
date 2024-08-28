import { Test, TestingModule } from "@nestjs/testing";
import { PlansController } from "@modules/plans/plans.controller";
import { PlansService } from "@modules/plans/plans.service";
import { CreatePlanDto } from "@modules/plans/dto/create-plan.dto";
import { UpdatePlanDto } from "@modules/plans/dto/update-plan.dto";
import { Response } from "express";
import { ValidationError } from "class-validator";

describe("PlansController", () => {
	let controller: PlansController;
	let service: PlansService;

	const mockPlan = {
		_id: "1",
	};

	const mockPlansService = {
		create: jest
			.fn()
			.mockImplementation((dto: CreatePlanDto) =>
				Promise.resolve({ _id: "1", ...dto }),
			),
		findAll: jest.fn().mockResolvedValue([mockPlan]),
		findOne: jest
			.fn()
			.mockImplementation((id: string) =>
				Promise.resolve({ _id: id, ...mockPlan }),
			),
		update: jest
			.fn()
			.mockImplementation((id: string, dto: UpdatePlanDto) =>
				Promise.resolve({ _id: id, ...dto }),
			),
		remove: jest.fn().mockResolvedValue({ _id: "1", ...mockPlan }),
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
			controllers: [PlansController],
			providers: [
				{
					provide: PlansService,
					useValue: mockPlansService,
				},
			],
		}).compile();

		controller = module.get<PlansController>(PlansController);
		service = module.get<PlansService>(PlansService);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	/*
	 * Create
	 */
	it("Create [201] - should create a plan", async () => {
		const dto: CreatePlanDto = {};

		const res = mockResponse() as Response;

		await controller.create(dto, res);

		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({
			code: 201,
			datas: { plans: { _id: "1", ...dto } },
			message: "plans create with success",
			success: true,
		});
		expect(service.create).toHaveBeenCalledWith(dto);
	});

	it("Create [422] - should handle validation errors when creating a plan", async () => {
		const dto: CreatePlanDto = {};

		const validationError = new ValidationError();
		validationError.property = "PROPERTY";
		validationError.constraints = { VALIDATOR: "VALIDATOR MESSAGE" };

		jest.spyOn(service, "create").mockRejectedValueOnce([validationError]);

		const res = mockResponse() as Response;

		await controller.create(dto, res);

		expect(res.status).toHaveBeenCalledWith(422);
		expect(res.json).toHaveBeenCalledWith({
			code: 422,
			datas: { plans: [validationError] },
			message: "Validation errors occurred",
			success: false,
		});
		expect(service.create).toHaveBeenCalledWith(dto);
	});

	it("Create [500] - should handle internal server errors when creating a plan", async () => {
		const dto: CreatePlanDto = {};

		jest.spyOn(service, "create").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.create(dto, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { plans: "Internal server error" },
			message: "An internal server error occurred",
			success: false,
		});
		expect(service.create).toHaveBeenCalledWith(dto);
	});

	/*
	 * FindAll
	 */
	it("FindAll [200] - should return all plans", async () => {
		const res = mockResponse() as Response;

		await controller.findAll(res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			datas: { plans: [mockPlan] },
			message: "plans retrieve with success",
			success: true,
		});
		expect(service.findAll).toHaveBeenCalled();
	});

	it("FindAll [404] - should handle not found error when returning all plans", async () => {
		jest.spyOn(service, "findAll").mockResolvedValueOnce([]);

		const res = mockResponse() as Response;

		await controller.findAll(res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { plans: "Not Found" },
			message: "plans not found",
			success: false,
		});
		expect(service.findAll).toHaveBeenCalled();
	});

	it("FindAll [500] - should handle internal server errors when returning all plans", async () => {
		jest.spyOn(service, "findAll").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.findAll(res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { plans: "Internal server error" },
			message: "plans internal server error",
			success: false,
		});
		expect(service.findAll).toHaveBeenCalled();
	});

	/*
	 * FindOne
	 */
	it("FindOne [200] - should return a single plan by id", async () => {
		const res = mockResponse() as Response;

		await controller.findOne("1", res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			datas: { plans: { _id: "1", ...mockPlan } },
			message: "plans retrieve with success",
			success: true,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	it("FindOne [404] - should handle not found error when returning a single plan by id", async () => {
		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

		const res = mockResponse() as Response;

		await controller.findOne("1", res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { plans: "Not Found" },
			message: "plans not found",
			success: false,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	it("FindOne [500] - should handle internal server errors when returning a single plan by id", async () => {
		jest.spyOn(service, "findOne").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.findOne("1", res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { plans: "Internal server error" },
			message: "plans internal server error",
			success: false,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	/*
	 * Update
	 */
	it("Update [404] - should handle not found error when updating a plan by id", async () => {
		const dto: UpdatePlanDto = { PROPERTY: "VALUE" };

		jest.spyOn(service, "update").mockResolvedValueOnce(null);

		const res = mockResponse() as Response;

		await controller.update("1", dto, res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { plans: "Not Found" },
			message: "plans not found",
			success: false,
		});
		expect(service.update).toHaveBeenCalledWith("1", dto);
	});

	it("Update [500] - should handle internal server errors when updating a plan by id", async () => {
		const dto: UpdatePlanDto = { PROPERTY: "VALUE" };

		jest.spyOn(service, "update").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.update("1", dto, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { plans: "Internal server error" },
			message: "plans internal server error",
			success: false,
		});
		expect(service.update).toHaveBeenCalledWith("1", dto);
	});

	it("Update [422] - should handle validation errors when updating a plan by id", async () => {
		const dto: UpdatePlanDto = { PROPERTY: "VALUE" };

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
			datas: { plans: [validationError] },
			message: "Validation errors occurred",
			success: false,
		});
		expect(service.update).toHaveBeenCalledWith("1", dto);
	});

	/*
	 * Delete
	 */
	it("Delete [200] - should delete a plan by id", async () => {
		const res = mockResponse() as Response;

		await controller.remove("1", res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			datas: { plans: { removed: true } },
			message: "plans delete with success",
			success: true,
		});
		expect(service.remove).toHaveBeenCalledWith("1");
	});

	it("Delete [404] - should handle not found error when deleting a plan by id", async () => {
		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

		const res = mockResponse() as Response;

		await controller.remove("1", res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { plans: {} },
			message: "plans not found",
			success: false,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	it("Delete [500] - should handle internal server errors when deleting a plan by id", async () => {
		jest.spyOn(service, "remove").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.remove("1", res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { plans: "Internal server error" },
			message: "plans internal server error",
			success: false,
		});
		expect(service.remove).toHaveBeenCalledWith("1");
	});
});
