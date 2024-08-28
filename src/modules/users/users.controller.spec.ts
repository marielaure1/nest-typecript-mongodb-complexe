import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "@modules/users/users.controller";
import { UsersService } from "@modules/users/users.service";
import { CreateUserDto } from "@modules/users/dto/create-user.dto";
import { UpdateUserDto } from "@modules/users/dto/update-user.dto";
import { Response } from "express";
import { ValidationError } from "class-validator";
import { UserRoleEnum } from "@enums/user-role.enum";
import { UserStatusEnum } from "@enums/user-status.enum";
import { HttpStatus } from "@nestjs/common";

// TODO: Add more tests
describe("UsersController", () => {
	let controller: UsersController;
	let service: UsersService;
	let res: Partial<Response>;

	beforeEach(async () => {
		const mockUsersService = {
			create: jest.fn(),
			findAll: jest.fn(),
			findOne: jest.fn(),
			update: jest.fn(),
			remove: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile();

		controller = module.get<UsersController>(UsersController);
		service = module.get<UsersService>(UsersService);

		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
			send: jest.fn(),
		};
	});

	// describe("UsersController", () => {
	// 	let controller: UsersController;
	// 	let service: UsersService;

	// 	beforeEach(async () => {
	// 		const module: TestingModule = await Test.createTestingModule({
	// 			controllers: [UsersController],
	// 			providers: [
	// 				{
	// 					provide: UsersService,
	// 					useValue: {
	// 						create: jest.fn(),
	// 						findAll: jest.fn(),
	// 						findOne: jest.fn(),
	// 						update: jest.fn(),
	// 						remove: jest.fn(),
	// 					},
	// 				},
	// 			],
	// 		}).compile();

	// 		controller = module.get<UsersController>(UsersController);
	// 		service = module.get<UsersService>(UsersService);
	// 	});

	// 	it("should be defined", () => {
	// 		expect(controller).toBeDefined();
	// 	});
	// });

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	/*
	 * Create
	 */

	it("Create [201] - should create a user", async () => {
		const dto: CreateUserDto = {
			email: "test@example.com",
			password: "Password123!",
			phone: "1234567890",
			status: [UserStatusEnum.VERIFIED],
			role: UserRoleEnum.CLIENT,
		};

		const createdUser = {
			_id: "1",
			...dto,
		};

		(service.create as jest.Mock).mockResolvedValue(createdUser);

		await controller.create(dto, res as Response);

		expect(service.create).toHaveBeenCalledWith(dto);
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({
			code: 201,
			data: { user: createdUser },
			message: "User created successfully",
			success: true,
		});
	});

	it("Create [400] - should handle validation error for invalid email", async () => {
		const dto: CreateUserDto = {
			email: "invalid-email",
			password: "Password123!",
			status: [UserStatusEnum.VERIFIED],
			role: UserRoleEnum.CLIENT,
		};

		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;

		jest.spyOn(service, "create").mockImplementation(() => {
			throw new ValidationError();
		});

		try {
			await controller.create(dto, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				code: 400,
				message: "Validation failed",
				success: false,
			});
		}
	});

	it("Create [400] - should handle validation error for missing password", async () => {
		const dto: CreateUserDto = {
			email: "test@example.com",
			password: "",
			status: [UserStatusEnum.VERIFIED],
			role: UserRoleEnum.CLIENT,
		};

		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;

		jest.spyOn(service, "create").mockImplementation(() => {
			throw new ValidationError();
		});

		try {
			await controller.create(dto, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				code: 400,
				message: "Validation failed",
				success: false,
			});
		}
	});

	it("Create [409] - should handle duplicate email error", async () => {
		const dto: CreateUserDto = {
			email: "test@example.com",
			password: "Password123!",
			status: [UserStatusEnum.VERIFIED],
			role: UserRoleEnum.CLIENT,
		};

		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;

		jest.spyOn(service, "create").mockImplementation(() => {
			throw new Error("Duplicate email error");
		});

		try {
			await controller.create(dto, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(409);
			expect(res.json).toHaveBeenCalledWith({
				code: 409,
				message: "Email already exists",
				success: false,
			});
		}
	});

	it("Create [422] - should handle validation error for invalid email", async () => {
		const dto: CreateUserDto = {
			email: "invalid-email",
			password: "Password123!",
			status: [UserStatusEnum.VERIFIED],
			role: UserRoleEnum.CLIENT,
		};

		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;

		jest.spyOn(service, "create").mockImplementation(() => {
			throw new ValidationError();
		});

		try {
			await controller.create(dto, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(422);
			expect(res.json).toHaveBeenCalledWith({
				code: 422,
				message:
					"Validation failed: Email does not match the required pattern",
				success: false,
				errors: expect.any(Array),
			});
		}
	});

	it("Create [422] - should handle validation error for invalid password", async () => {
		const dto: CreateUserDto = {
			email: "test@example.com",
			password: "weakpass",
			status: [UserStatusEnum.VERIFIED],
			role: UserRoleEnum.CLIENT,
		};

		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;

		jest.spyOn(service, "create").mockImplementation(() => {
			throw new ValidationError();
		});

		try {
			await controller.create(dto, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(422);
			expect(res.json).toHaveBeenCalledWith({
				code: 422,
				message:
					"Validation failed: Password does not match the required pattern",
				success: false,
				errors: expect.any(Array),
			});
		}
	});

	it("Create [422] - should handle validation error for invalid status", async () => {
		const dto: CreateUserDto = {
			email: "test@example.com",
			password: "Password123!",
			status: ["INVALID_STATUS"] as any,
			role: UserRoleEnum.CLIENT,
		};

		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;

		jest.spyOn(service, "create").mockImplementation(() => {
			throw new ValidationError();
		});

		try {
			await controller.create(dto, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(422);
			expect(res.json).toHaveBeenCalledWith({
				code: 422,
				message: "Validation failed: Invalid status",
				success: false,
				errors: expect.any(Array),
			});
		}
	});

	it("Create [422] - should handle validation error for invalid role", async () => {
		const dto: CreateUserDto = {
			email: "test@example.com",
			password: "Password123!",
			status: [UserStatusEnum.VERIFIED],
			role: "INVALID_ROLE" as any,
		};

		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;

		jest.spyOn(service, "create").mockImplementation(() => {
			throw new ValidationError();
		});

		try {
			await controller.create(dto, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(422);
			expect(res.json).toHaveBeenCalledWith({
				code: 422,
				message: "Validation failed: Invalid role",
				success: false,
				errors: expect.any(Array),
			});
		}
	});

	it("Create [500] - should handle server error", async () => {
		const dto: CreateUserDto = {
			email: "test@example.com",
			password: "Password123!",
			status: [UserStatusEnum.VERIFIED],
			role: UserRoleEnum.CLIENT,
		};

		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;

		jest.spyOn(service, "create").mockImplementation(() => {
			throw new Error("Internal Server Error");
		});

		try {
			await controller.create(dto, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				code: 500,
				message: "Internal Server Error",
				success: false,
			});
		}
	});

	/*
	 * FindAll
	 */
	it("FindAll [200] - should return an array of users", async () => {
		const users = [
			{
				_id: "1",
				email: "user1@example.com",
				password: "Password123!",
				status: [UserStatusEnum.VERIFIED],
				role: UserRoleEnum.CLIENT,
			},
			{
				_id: "2",
				email: "user2@example.com",
				password: "Password123!",
				status: [UserStatusEnum.VERIFIED],
				role: UserRoleEnum.CLIENT,
			},
		];

		(service.findAll as jest.Mock).mockResolvedValue(users);

		await controller.findAll(res as Response);

		expect(service.findAll).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			data: { users },
			message: "Users retrieved successfully",
			success: true,
		});
	});

	it("FindAll [404] - should handle no users found", async () => {
		(service.findAll as jest.Mock).mockResolvedValue([]);

		await controller.findAll(res as Response);

		expect(service.findAll).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			message: "Users not found",
			error: "Not found",
			success: false,
		});
	});

	it("FindAll [500] - should handle server error", async () => {
		(service.findAll as jest.Mock).mockImplementation(() => {
			throw new Error("Internal Server Error");
		});

		try {
			await controller.findAll(res as Response);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				code: 500,
				message: "Internal Server Error",
				success: false,
			});
		}
	});

	/*
	 * FindOne
	 */
	it("FindOne [200] - should return a user by ID", async () => {
		const user = {
			_id: "1",
			email: "user1@example.com",
			password: "Password123!",
			status: [UserStatusEnum.VERIFIED],
			role: UserRoleEnum.CLIENT,
		};

		(service.findOne as jest.Mock).mockResolvedValue(user);

		await controller.findOne("1", res as Response);

		expect(service.findOne).toHaveBeenCalledWith("1");
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			data: { user },
			message: "User retrieved successfully",
			success: true,
		});
	});

	it("FindOne [400] - should handle validation error for invalid ID", async () => {
		jest.spyOn(service, "findOne").mockImplementation(() => {
			throw new ValidationError();
		});

		try {
			await controller.findOne("invalid-id", res as Response);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				code: 400,
				message: "Invalid ID format",
				success: false,
			});
		}
	});

	it("FindOne [404] - should handle user not found", async () => {
		(service.findOne as jest.Mock).mockResolvedValue(null);

		await controller.findOne("1", res as Response);

		expect(service.findOne).toHaveBeenCalledWith("1");
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			message: "User not found",
			error: "Not Found",
			success: false,
		});
	});

	it("FindOne [500] - should handle server error", async () => {
		(service.findOne as jest.Mock).mockImplementation(() => {
			throw new Error("Internal Server Error");
		});

		try {
			await controller.findOne("1", res as Response);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				code: 500,
				message: "Internal Server Error",
				success: false,
			});
		}
	});

	it("FindOne [500] - should handle database error", async () => {
		(service.findOne as jest.Mock).mockImplementation(() => {
			throw new Error("Database Error");
		});

		try {
			await controller.findOne("1", res as Response);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				code: 500,
				message: "Database Error",
				success: false,
			});
		}
	});

	/*
	 * Update
	 */
	it("Update [200] - should update a user by ID", async () => {
		const updateUserDto: UpdateUserDto = {
			email: "updated@example.com",
			status: [UserStatusEnum.ACTIVE],
		};

		const updatedUser = {
			_id: "1",
			...updateUserDto,
			role: UserRoleEnum.CLIENT,
		};

		(service.update as jest.Mock).mockResolvedValue(updatedUser);

		await controller.update("1", updateUserDto, res as Response);

		expect(service.update).toHaveBeenCalledWith("1", updateUserDto);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			code: 200,
			data: { user: updatedUser },
			message: "User updated successfully",
			success: true,
		});
	});

	it("Update [400] - should handle validation error for invalid ID", async () => {
		const updateUserDto: UpdateUserDto = {
			email: "updated@example.com",
			status: [UserStatusEnum.ACTIVE],
		};

		jest.spyOn(service, "update").mockImplementation(() => {
			throw new ValidationError();
		});

		try {
			await controller.update(
				"invalid-id",
				updateUserDto,
				res as Response,
			);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				code: 400,
				message: "Invalid ID format",
				success: false,
			});
		}
	});

	it("Update [404] - should handle user not found", async () => {
		const updateUserDto: UpdateUserDto = {
			email: "updated@example.com",
			status: [UserStatusEnum.ACTIVE],
		};

		(service.update as jest.Mock).mockResolvedValue(null);

		await controller.update("1", updateUserDto, res as Response);

		expect(service.update).toHaveBeenCalledWith("1", updateUserDto);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			error: "Not Found",
			message: "User not found",
			success: false,
		});
	});

	it("Update [422] - should handle validation error for invalid data", async () => {
		const updateUserDto: UpdateUserDto = {
			email: "invalid-email",
			status: [UserStatusEnum.ACTIVE],
		};

		jest.spyOn(service, "update").mockImplementation(() => {
			throw new ValidationError();
		});

		try {
			await controller.update("1", updateUserDto, res as Response);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(422);
			expect(res.json).toHaveBeenCalledWith({
				code: 422,
				message: "Validation failed",
				success: false,
				errors: expect.any(Array),
			});
		}
	});

	it("Update [500] - should handle server error", async () => {
		const updateUserDto: UpdateUserDto = {
			email: "updated@example.com",
			status: [UserStatusEnum.ACTIVE],
		};

		(service.update as jest.Mock).mockImplementation(() => {
			throw new Error("Internal Server Error");
		});

		try {
			await controller.update("1", updateUserDto, res as Response);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				code: 500,
				message: "Internal Server Error",
				success: false,
			});
		}
	});

	it("Update [500] - should handle database error", async () => {
		const updateUserDto: UpdateUserDto = {
			email: "updated@example.com",
			status: [UserStatusEnum.ACTIVE],
		};

		jest.spyOn(service, "update").mockImplementation(() => {
			throw new Error("Database Error");
		});

		try {
			await controller.update("1", updateUserDto, res as Response);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				code: 500,
				message: "Database Error",
				success: false,
			});
		}
	});

	/*
	 * Delete
	 */
	it("Delete [204] - should delete a user by ID", async () => {
		const mockUser = { id: "1", email: "user@example.com" };

		(service.findOne as jest.Mock).mockResolvedValue(mockUser); // Simule l'utilisateur trouvé
		(service.remove as jest.Mock).mockResolvedValue(undefined); // Simule la suppression

		await controller.remove("1", res as Response);

		expect(service.findOne).toHaveBeenCalledWith("1");
		expect(service.remove).toHaveBeenCalledWith("1");
		expect(res.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
		expect(res.send).toHaveBeenCalled(); // Vérifie que send() est bien appelé
	});

	//   it("Delete [200] - should delete a client by id", async () => {
	// 	const res = mockResponse() as Response;

	// 	await controller.remove("1", res);

	// 	expect(res.status).toHaveBeenCalledWith(200);
	// 	expect(res.json).toHaveBeenCalledWith({
	// 		code: 200,
	// 		datas: { clients: { removed: true } },
	// 		message: "clients delete with success",
	// 		success: true,
	// 	});
	// 	expect(service.remove).toHaveBeenCalledWith("1");
	// });

	it("Delete [400] - should handle validation error for invalid ID", async () => {
		jest.spyOn(service, "remove").mockImplementation(() => {
			throw new ValidationError();
		});

		try {
			await controller.remove("invalid-id", res as Response);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				code: 400,
				message: "Invalid ID format",
				success: false,
			});
		}
	});

	it("Delete [404] - should handle user not found", async () => {
		(service.remove as jest.Mock).mockResolvedValue(null);

		await controller.remove("1", res as Response);

		expect(service.remove).toHaveBeenCalledWith("1");
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			code: 404,
			message: "User not found",
			success: false,
		});
	});

	it("Delete [500] - should handle server error", async () => {
		(service.remove as jest.Mock).mockImplementation(() => {
			throw new Error("Internal Server Error");
		});

		try {
			await controller.remove("1", res as Response);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				code: 500,
				message: "Internal Server Error",
				success: false,
			});
		}
	});

	it("Delete [500] - should handle database error", async () => {
		jest.spyOn(service, "remove").mockImplementation(() => {
			throw new Error("Database Error");
		});

		try {
			await controller.remove("1", res as Response);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				code: 500,
				message: "Database Error",
				success: false,
			});
		}
	});
});
