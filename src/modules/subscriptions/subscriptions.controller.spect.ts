import { Test, TestingModule } from "@nestjs/testing";
import { SubscriptionsController } from "@modules/subscriptions/subscriptions.controller";
import { SubscriptionsService } from "@modules/subscriptions/subscriptions.service";
import { CreateSubscriptionDto } from "@modules/subscriptions/dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "@modules/subscriptions/dto/update-subscription.dto";
import { Response } from "express";
import { ValidationError } from "class-validator";

describe("SubscriptionsController", () => {
	let controller: SubscriptionsController;
	let service: SubscriptionsService;

	const mockSubscription = {
		_id: "1",
	};

	const mockSubscriptionsService = {
		create: jest
			.fn()
			.mockImplementation((dto: CreateSubscriptionDto) =>
				Promise.resolve({ _id: "1", ...dto }),
			),
		findAll: jest.fn().mockResolvedValue([mockSubscription]),
		findOne: jest
			.fn()
			.mockImplementation((id: string) =>
				Promise.resolve({ _id: id, ...mockSubscription }),
			),
		update: jest
			.fn()
			.mockImplementation((id: string, dto: UpdateSubscriptionDto) =>
				Promise.resolve({ _id: id, ...dto }),
			),
		remove: jest.fn().mockResolvedValue({ _id: "1", ...mockSubscription }),
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
			controllers: [SubscriptionsController],
			providers: [
				{
					provide: SubscriptionsService,
					useValue: mockSubscriptionsService,
				},
			],
		}).compile();

		controller = module.get<SubscriptionsController>(
			SubscriptionsController,
		);
		service = module.get<SubscriptionsService>(SubscriptionsService);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	/*
	 * Create
	 */
	it("Create [201] - should create a subscription", async () => {
		const dto: CreateSubscriptionDto = {};

		const res = mockResponse() as Response;

		await controller.create(dto, res);

		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({
			code: 201,
			datas: { subscriptions: { _id: "1", ...dto } },
			message: "subscriptions create with success",
			success: true,
		});
		expect(service.create).toHaveBeenCalledWith(dto);
	});

	it("Create [422] - should handle validation errors when creating a subscription", async () => {
		const dto: CreateSubscriptionDto = {};

		const validationError = new ValidationError();
		validationError.property = "PROPERTY";
		validationError.constraints = { VALIDATOR: "VALIDATOR MESSAGE" };

		jest.spyOn(service, "create").mockRejectedValueOnce([validationError]);

		const res = mockResponse() as Response;

		await controller.create(dto, res);

		expect(res.status).toHaveBeenCalledWith(422);
		expect(res.json).toHaveBeenCalledWith({
			code: 422,
			datas: { subscriptions: [validationError] },
			message: "Validation errors occurred",
			success: false,
		});
		expect(service.create).toHaveBeenCalledWith(dto);
	});

	it("Create [500] - should handle internal server errors when creating a subscription", async () => {
		const dto: CreateSubscriptionDto = {};

		jest.spyOn(service, "create").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.create(dto, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { subscriptions: "Internal server error" },
			message: "An internal server error occurred",
			success: false,
		});
		expect(service.create).toHaveBeenCalledWith(dto);
	});

	/*
	 * FindAll
	 */
	it("FindAll [200] - should return all subscriptions", async () => {
		const res = mockResponse() as Response;

		await controller.findAll(res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			datas: { subscriptions: [mockSubscription] },
			message: "subscriptions retrieve with success",
			success: true,
		});
		expect(service.findAll).toHaveBeenCalled();
	});

	it("FindAll [404] - should handle not found error when returning all subscriptions", async () => {
		jest.spyOn(service, "findAll").mockResolvedValueOnce([]);

		const res = mockResponse() as Response;

		await controller.findAll(res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { subscriptions: "Not Found" },
			message: "subscriptions not found",
			success: false,
		});
		expect(service.findAll).toHaveBeenCalled();
	});

	it("FindAll [500] - should handle internal server errors when returning all subscriptions", async () => {
		jest.spyOn(service, "findAll").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.findAll(res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { subscriptions: "Internal server error" },
			message: "subscriptions internal server error",
			success: false,
		});
		expect(service.findAll).toHaveBeenCalled();
	});

	/*
	 * FindOne
	 */
	it("FindOne [200] - should return a single subscription by id", async () => {
		const res = mockResponse() as Response;

		await controller.findOne("1", res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			datas: { subscriptions: { _id: "1", ...mockSubscription } },
			message: "subscriptions retrieve with success",
			success: true,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	it("FindOne [404] - should handle not found error when returning a single subscription by id", async () => {
		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

		const res = mockResponse() as Response;

		await controller.findOne("1", res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { subscriptions: "Not Found" },
			message: "subscriptions not found",
			success: false,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	it("FindOne [500] - should handle internal server errors when returning a single subscription by id", async () => {
		jest.spyOn(service, "findOne").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.findOne("1", res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { subscriptions: "Internal server error" },
			message: "subscriptions internal server error",
			success: false,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	/*
	 * Update
	 */
	it("Update [404] - should handle not found error when updating a subscription by id", async () => {
		const dto: UpdateSubscriptionDto = { PROPERTY: "VALUE" };

		jest.spyOn(service, "update").mockResolvedValueOnce(null);

		const res = mockResponse() as Response;

		await controller.update("1", dto, res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { subscriptions: "Not Found" },
			message: "subscriptions not found",
			success: false,
		});
		expect(service.update).toHaveBeenCalledWith("1", dto);
	});

	it("Update [500] - should handle internal server errors when updating a subscription by id", async () => {
		const dto: UpdateSubscriptionDto = { PROPERTY: "VALUE" };

		jest.spyOn(service, "update").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.update("1", dto, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { subscriptions: "Internal server error" },
			message: "subscriptions internal server error",
			success: false,
		});
		expect(service.update).toHaveBeenCalledWith("1", dto);
	});

	it("Update [422] - should handle validation errors when updating a subscription by id", async () => {
		const dto: UpdateSubscriptionDto = { PROPERTY: "VALUE" };

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
			datas: { subscriptions: [validationError] },
			message: "Validation errors occurred",
			success: false,
		});
		expect(service.update).toHaveBeenCalledWith("1", dto);
	});

	/*
	 * Delete
	 */
	it("Delete [200] - should delete a subscription by id", async () => {
		const res = mockResponse() as Response;

		await controller.remove("1", res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			datas: { subscriptions: { removed: true } },
			message: "subscriptions delete with success",
			success: true,
		});
		expect(service.remove).toHaveBeenCalledWith("1");
	});

	it("Delete [404] - should handle not found error when deleting a subscription by id", async () => {
		jest.spyOn(service, "findOne").mockResolvedValueOnce(null);

		const res = mockResponse() as Response;

		await controller.remove("1", res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			datas: { subscriptions: {} },
			message: "subscriptions not found",
			success: false,
		});
		expect(service.findOne).toHaveBeenCalledWith("1");
	});

	it("Delete [500] - should handle internal server errors when deleting a subscription by id", async () => {
		jest.spyOn(service, "remove").mockRejectedValueOnce(
			new Error("Internal server error"),
		);

		const res = mockResponse() as Response;

		await controller.remove("1", res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			code: 500,
			datas: { subscriptions: "Internal server error" },
			message: "subscriptions internal server error",
			success: false,
		});
		expect(service.remove).toHaveBeenCalledWith("1");
	});
});
