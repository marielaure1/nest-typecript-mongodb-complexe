import { userInfo } from "os";
import { UserDocument } from "@modules/users/entities/user.entity";
import { LogsService } from "@modules/logs/logs.service";
import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Ip,
	Param,
	Post,
	Put,
	Req,
	Res,
	UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "@modules/users/users.service";
import { ClientsService } from "@modules/clients/clients.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Responses } from "@helpers/responses.helper";
import { CreateAuthClientDto } from "@modules/auth/dto/create-auth-client.dto";
import { CreateAuthOrganizationDto } from "@modules/auth/dto/create-auth-organization.dto";
import { FastifyReply, FastifyRequest } from "fastify";
import { NotificationHelper } from "@helpers/notification.helper";
import Hash from "@helpers/hash.helper";
import { Token } from "@helpers/token.helper";
import { UserStatusEnum } from "@enums/user-status.enum";
import { MailHelper } from "@src/providers/mail/helpers/mail.helper";
import { TokenTypeEnum } from "@enums/token-type.enum";
import { LoginUserDto } from "@modules/auth/dto/login-user.dto";
import { RefreshTokenDto } from "@modules/auth/dto/refresh-token.dto";
import { InitPasswordDto } from "@modules/auth/dto/init-password.dto";
import { ForgotPasswordDto } from "@modules/auth/dto/forgot-password.dto";
import { LogLevelEnum } from "@modules/logs/enums/log-level.enum";
import { OrganizationsService } from "@modules/organizations/organizations.service";
import { EmployeesService } from "@modules/employees/employees.service";
import { UserRoleEnum } from "@enums/user-role.enum";
import { StringHelper } from "@helpers/string.helper";
import { Connection, Document } from "mongoose";
import { CryptoHelper } from "@helpers/crypto.helper";
import { LogInterceptor } from "@interceptors/log.interceptor";
import { LogsHelper } from "@modules/logs/helpers/logs.helper";
import { last } from "rxjs";
import { UserHelper } from "@modules/users/helpers/user.helper";
import { BookerEmployeeDocument } from "@modules/booker-employees/entities/booker-employee.entity";
import { ClientDocument } from "@modules/clients/entities/client.entity";
import { BookerEmployeesService } from "@modules/booker-employees/booker-employees.service";
import { EmployeeDocument } from "@modules/employees/entities/employee.entity";
import { TokenJwtDto } from "@dtos/token-jwt.dto";

@ApiTags("auth")
@Controller("auth")
@UseInterceptors(LogInterceptor)
export class AuthController {
	constructor(
		private readonly userService: UsersService,
		private readonly clientService: ClientsService,
		private readonly bookerEmployeesService: BookerEmployeesService,
		private readonly employeesService: EmployeesService,
		private readonly organizationsService: OrganizationsService,
		private readonly mailHelper: MailHelper,
		private readonly connection: Connection,
		private readonly logsHelper: LogsHelper,
	) {}

	/**
	 * Registers a new client. This involves creating both a user and client entity within a transaction.
	 *
	 * @param createAuthClientDto - The data transfer object containing client information such as name, email, phone number, and password.
	 * @param res - The response object used to send the result back to the client.
	 * @param req - The request object that holds metadata like headers for tracing and session handling.
	 * @param ip - The client's IP address, used for logging and security purposes.
	 *
	 * @returns A JSON response containing the user and client data or an error message if the process fails.
	 */
	@ApiOperation({ summary: "Register a new client" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The client has been successfully registered.",
		content: {
			"application/json": {
				example: {
					data: {
						user: {
							id: "123",
							email: "user@example.com",
							phone: "+1234567890",
							status: UserStatusEnum.AVAILABLE,
							isActive: true,
							isVerified: false,
							lastConnection: null,
							role: UserRoleEnum.CLIENT,
						},
						client: {
							id: "456",
							firstName: "John",
							lastName: "Doe",
							address1: "123 Main St",
							address2: "Apt 4B",
							postalCode: "12345",
							city: "New York",
							country: "USA",
							notificationEmail: true,
							notificationSms: true,
						},
					},
					message: "Client registration completed successfully.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid input data.",
		content: {
			"application/json": { example: { error: "Invalid email format." } },
		},
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: "Conflict - Email or phone number already exists.",
		content: {
			"application/json": {
				example: {
					error: "An account with this email already exists.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.UNPROCESSABLE_ENTITY,
		description: "Unprocessable Entity - Phone number is required.",
		content: {
			"application/json": {
				example: { error: "Phone number is required." },
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
		content: {
			"application/json": {
				example: { error: "Server error, please try again later." },
			},
		},
	})
	@Post("register/client")
	async registerClient(
		@Body() createAuthClientDto: CreateAuthClientDto,
		@Res() res: FastifyReply,
		@Req() req: FastifyRequest,
		@Ip() ip: string,
	) {
		const path = "registerClient";
		const method = "Post";
		const session = await this.connection.startSession();
		session.startTransaction();

		const requestId =
			req.headers["x-request-id"] || CryptoHelper.generateRequestId();
		const traceId =
			req.headers["x-trace-id"] || CryptoHelper.generateTraceId();

		try {
			// Check if phone number is required
			NotificationHelper.isPhoneRequired(
				createAuthClientDto.phone,
				createAuthClientDto.notificationSms,
			);

			// Hash password
			createAuthClientDto.password = await Hash.hashData(
				createAuthClientDto.password,
			);

			createAuthClientDto.role = UserRoleEnum.CLIENT;

			// Create user and client inside the session
			const user = await this.userService.create(
				createAuthClientDto,
				session,
			);

			const client = await this.clientService.create(
				{
					...createAuthClientDto,
					userId: user._id?.toString(),
				},
				session,
			);

			// Generate token for email confirmation
			const payload = {
				sub: user._id,
				email: user.email,
				type: TokenTypeEnum.CONFIRMATION_ACCOUNT,
			};
			const token = Token.generateToken(payload);

			// Email confirmation for the client
			await this.mailHelper.sendConfirmAccountClient({
				to: [user.email],
				templateDatas: {
					firstName: client.firstName,
					token: token,
				},
			});

			await this.logsHelper.logInfo({
				ip,
				userId: user._id.toString(),
				email: user.email,
				message: "Client confirmation email sent",
				context: `AuthController > ${path}`,
				metadata: {
					requestId,
					traceId,
					clientId: client._id.toString(),
				},
			});

			// Commit the transaction
			await session.commitTransaction();

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.CREATED,
				subject: "auth",
				data: {
					user,
					client,
				},
			});
		} catch (error) {
			// Abort the transaction
			await session.abortTransaction();

			console.error(`AuthController > ${path} : `, error);

			if (error.code === 11000) {
				// MongoDB duplicate key error
				const field = error.message.includes("email")
					? "email"
					: "phone number";
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.CONFLICT,
					subject: "auth",
					error: `An account with this ${field} already exists.`,
				});
			} else if (error.message === "Phone number is required") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.UNPROCESSABLE_ENTITY,
					subject: "auth",
					error: "Phone number is required",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while creating the account",
			});
		} finally {
			session.endSession();
		}
	}

	/**
	 * Register a new organization
	 *
	 * This endpoint allows you to register a new organization along with the
	 * super admin user and an associated booker employee. The method
	 * handles transaction management to ensure that all entities are created
	 * successfully or none at all, ensuring data consistency.
	 *
	 * @param createAuthOrganizationDto - Data Transfer Object containing all
	 * necessary data to create an organization, its super admin, and an associated
	 * booker employee.
	 * @param res - The response object used to return the result of the operation.
	 * @returns A JSON response containing the created organization and user, or an error message.
	 */
	@ApiOperation({ summary: "Register a new organization" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The organization has been successfully registered.",
		content: {
			"application/json": {
				example: {
					data: {
						organization: {
							id: "org_001",
							name: "Tech Innovators Inc.",
							managerId: "manager_001",
						},
						user: {
							id: "123",
							email: "user@example.com",
							phone: "+1234567890",
							status: UserStatusEnum.AVAILABLE,
							isActive: true,
							isVerified: false,
							lastConnection: null,
							role: UserRoleEnum.CLIENT,
						},
					},
					message:
						"Organization registration completed successfully.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid input data.",
		content: {
			"application/json": {
				example: {
					error: "Invalid data provided. Please check your input and try again.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: "Conflict - Email or phone number already exists.",
		content: {
			"application/json": {
				example: {
					error: "An account with this email already exists.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.UNPROCESSABLE_ENTITY,
		description: "Unprocessable Entity - Phone number is required.",
		content: {
			"application/json": {
				example: {
					error: "Phone number is required.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
		content: {
			"application/json": {
				example: {
					error: "An error occurred while creating the account.",
				},
			},
		},
	})
	@Post("register/organization")
	async registerOrganization(
		@Body() createAuthOrganizationDto: CreateAuthOrganizationDto,
		@Res() res: FastifyReply,
		@Req() req: FastifyRequest,
		@Ip() ip: string,
	) {
		const path = "registerOrganization";
		const method = "Post";
		const session = await this.connection.startSession();
		session.startTransaction();

		console.log(CreateAuthOrganizationDto);

		try {
			createAuthOrganizationDto.password = await Hash.hashData(
				createAuthOrganizationDto.password,
			);

			// Create user
			let user = await this.userService.create(
				{
					...createAuthOrganizationDto,
					isActive: true,
					isVerified: false,
					role: UserRoleEnum.ORGANIZATION_OWNER,
					status: UserStatusEnum.CREATE_PASSWORD,
					lastConnection: null,
				},
				session,
			);

			user = user.toObject();
			delete user.password;

			if (!user) {
				throw new Error("User could not be created");
			}

			// Create employee
			const employee = await this.employeesService.create(
				{
					...createAuthOrganizationDto,
					userId: user._id.toString(),
				},
				session,
			);

			if (!employee) {
				throw new Error("Employee could not be created");
			}

			// Create organization
			const organization = await this.organizationsService.create(
				{
					...createAuthOrganizationDto,
					managerId: employee._id.toString(),
				},
				session,
			);

			if (!organization) {
				throw new Error("Organization could not be created");
			}

			// Generate token for email confirmation
			const payload = {
				sub: user._id,
				email: user.email,
				type: TokenTypeEnum.CONFIRMATION_ACCOUNT,
			};
			const token = Token.generateToken(payload);

			// Email confirmation for the organization
			await this.mailHelper.sendConfirmAccountOrganization({
				to: [user.email],
				templateDatas: {
					organizationName: organization.name,
					userEmail: user.email,
					token: token,
				},
			});

			// Log mail for confirmation of the organization
			await this.logsHelper.logInfo({
				ip,
				userId: user._id.toString(),
				email: user.email,
				message: "Organization confirmation email sent",
				context: `AuthController > ${path}`,
				metadata: {
					requestId: req.requestId,
					traceId: req.traceId,
					organization: organization._id.toString(),
				},
			});

			// Email for initial password
			await this.mailHelper.sendInitPasswordEmail({
				to: [user.email],
				templateDatas: {
					token: token,
				},
			});

			// Log email for initial password
			await this.logsHelper.logInfo({
				ip,
				userId: user._id.toString(),
				email: user.email,
				message: "Organisation Manager initial password email sent",
				context: `AuthController > ${path}`,
				metadata: {
					requestId: req.requestId,
					traceId: req.traceId,
					organization: organization._id.toString(),
				},
			});

			await session.commitTransaction();

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.CREATED,
				subject: "auth",
				data: {
					user,
					employee,
					organization,
				},
			});
		} catch (error) {
			await session.abortTransaction();
			console.error(`AuthController > ${path} : `, error);

			if (
				error.message.includes("E11000 duplicate key error collection")
			) {
				let errorMessage = "An account already exists";

				if (error.message.includes("email_1")) {
					errorMessage = "An account with this email already exists";
				} else if (error.message.includes("phone_1")) {
					errorMessage =
						"An account with this phone number already exists";
				}

				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.CONFLICT,
					subject: "auth",
					error: errorMessage,
				});
			} else if (error.message === "Phone number is required") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.UNPROCESSABLE_ENTITY,
					subject: "auth",
					error: "Phone number is required",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while creating the account",
			});
		} finally {
			session.endSession();
		}
	}

	/**
	 * Sign in a user.
	 *
	 * This endpoint allows a user to sign in by providing their email and password.
	 * The method handles user authentication, checks user status, and generates
	 * the necessary access and refresh tokens.
	 *
	 * @param loginUserDto - Data Transfer Object containing user's email and password.
	 * @param res - The response object used to return the result of the operation.
	 * @returns A JSON response containing access and refresh tokens, or an error message.
	 */
	@ApiOperation({ summary: "Sign in a user" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The user has been successfully authenticated.",
		content: {
			"application/json": {
				example: {
					access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
					refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid input data.",
		content: {
			"application/json": {
				example: {
					error: "Invalid data provided. Please check your input.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Not Found - User not found.",
		content: {
			"application/json": {
				example: { error: "User not found." },
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "Unauthorized - Invalid credentials.",
		content: {
			"application/json": {
				example: { error: "Invalid credentials." },
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.FORBIDDEN,
		description: "Forbidden - User suspended or banned.",
		content: {
			"application/json": {
				example: { error: "User suspended or banned." },
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
		content: {
			"application/json": {
				example: { error: "An error occurred while logging in." },
			},
		},
	})
	@Post("login")
	async login(
		@Body() loginUserDto: LoginUserDto,
		@Res() res: FastifyReply,
		@Req() req: FastifyRequest,
		@Ip() ip: string,
	) {
		const path = "login";
		const method = "Post";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Find user
			const user = await this.userService.findOne(
				{
					email: loginUserDto.email,
				},
				session,
				"+password",
			);

			if (!user) {
				throw new Error("User not found");
			}

			// Compare password
			const comparePassword = await Hash.hashCompareData(
				loginUserDto.password,
				user.password,
			);

			if (!comparePassword) {
				throw new Error("Invalid credentials");
			}

			let userInfo:
				| BookerEmployeeDocument
				| EmployeeDocument
				| ClientDocument = null;

			const userType = UserHelper.getUserType(user.role);

			if (userType === "Booker") {
				// Find Booker employee
				userInfo = await this.bookerEmployeesService.findOne(
					{ userId: user._id.toString() },
					session,
				);

				if (!userInfo) {
					throw new Error("Booker employee not found");
				}
			} else if (userType === "Employee") {
				// Find Employee
				userInfo = await this.employeesService.findOne(
					{ userId: user._id.toString() },
					session,
				);

				if (!userInfo) {
					throw new Error("Employee not found");
				}
			} else {
				// Find Client
				userInfo = await this.clientService.findOne(
					{ userId: user._id.toString() },
					session,
				);

				if (!userInfo) {
					throw new Error("Client not found");
				}
			}

			// Check user status
			if (!user.isVerified) {
				const payload = {
					sub: user._id,
					email: user.email,
					type: TokenTypeEnum.CONFIRMATION_ACCOUNT,
				};
				const tokenConfirmation = Token.generateToken(payload);

				// Send confirmation email
				await this.mailHelper.sendConfirmAccountClient({
					to: [user.email],
					templateDatas: {
						firstName: userInfo.firstName,
						token: tokenConfirmation,
					},
				});

				await this.logsHelper.logInfo({
					ip,
					userId: user._id.toString(),
					email: user.email,
					message: `${userType} Account confirmation email sent`,
					context: `AuthController > ${path}`,
					metadata: {
						requestId: req.requestId,
						traceId: req.traceId,
						userInfo: userInfo._id.toString(),
					},
				});

				throw new Error("Account not verified");
			}

			if (user.status === UserStatusEnum.CREATE_PASSWORD) {
				const payload = {
					sub: user._id,
					email: user.email,
					type: TokenTypeEnum.INIT_PASSWORD,
				};
				const tokenCreatePassword = Token.generateToken(payload);

				// Send initial password email
				await this.mailHelper.sendInitPasswordEmail({
					to: [user.email],
					templateDatas: {
						token: tokenCreatePassword,
					},
				});

				await this.logsHelper.logInfo({
					ip,
					userId: user._id.toString(),
					email: user.email,
					message: `${userType} Initial password email sent`,
					context: `AuthController > ${path}`,
					metadata: {
						requestId: req.requestId,
						traceId: req.traceId,
						userInfo: userInfo._id.toString(),
					},
				});

				throw new Error("Initial password email sent");
			}

			if (
				user.status === UserStatusEnum.SUSPENDED ||
				user.status === UserStatusEnum.BANNED
			) {
				throw new Error("User suspended or banned");
			}

			const userUpdated = await this.userService.update(
				user._id.toString(),
				{
					isActive: true,
					lastConnection: new Date(),
				},
			);

			if (!userUpdated) {
				throw new Error("User could not be updated");
			}

			// Generate tokens
			const payload_token = {
				sub: user._id,
				email: user.email,
			};

			const accessToken = Token.generateAccessToken({
				...payload_token,
				type: TokenTypeEnum.ACCESS,
			});
			const refreshToken = Token.generateRefreshToken({
				...payload_token,
				type: TokenTypeEnum.REFRESH,
			});

			await session.commitTransaction();

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: "auth",
				data: {
					access_token: accessToken,
					refresh_token: refreshToken,
				},
			});
		} catch (error) {
			await session.abortTransaction();
			console.error(`AuthController > ${path} : `, error);

			if (
				error.message === "User not found" ||
				error.message === "Client not found" ||
				error.message === "Booker employee not found" ||
				error.message === "Employee not found"
			) {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.NOT_FOUND,
					subject: "auth",
					error: error.message,
				});
			} else if (
				error.message === "Account not verified" ||
				error.message === "Invalid credentials"
			) {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.UNAUTHORIZED,
					subject: "auth",
					error: error.message,
				});
			} else if (error.message === "User suspended or banned") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.FORBIDDEN,
					subject: "auth",
					error: error.message,
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while logging in",
			});
		} finally {
			session.endSession();
		}
	}

	/**
	 * Confirm user account
	 * @param token : string
	 * @param res : Response
	 * @returns : Response
	 */
	@ApiOperation({ summary: "Confirm user account" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The user account has been successfully verified.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid token.",
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Not Found - User not found.",
	})
	@ApiResponse({
		status: HttpStatus.GONE,
		description: "Gone - Token expired.",
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
	})
	@Post("confirm")
	async confirm(@Body() tokenJwtDto: TokenJwtDto, @Res() res: FastifyReply) {
		const path = "confirm";
		const method = "Get";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Verify token
			const verifyToken = Token.verifyToken(
				tokenJwtDto.token,
				TokenTypeEnum.CONFIRMATION_ACCOUNT,
			);

			if (!verifyToken) {
				throw new Error("Invalid token");
			}

			// Get payload
			const payload = Token.getPayload(tokenJwtDto.token);

			if (!payload) {
				throw new Error("Invalid token");
			}

			const userTypeInfos = await this.userService.getUserTypeInfos(
				{
					id: payload.sub,
				},
				session,
			);

			const user = userTypeInfos.user;
			const userInfo = userTypeInfos.userInfo;

			if (user.isVerified) {
				throw new Error("Invalid token");
			}

			// Check if token is expired
			const isExpired = Token.isTokenExpired(tokenJwtDto.token);

			if (isExpired) {
				const payload = {
					sub: user._id,
					email: user.email,
					type: TokenTypeEnum.CONFIRMATION_ACCOUNT,
				};

				const newToken = Token.generateToken(payload);

				// Email confirmation for the client
				await this.mailHelper.sendConfirmAccountClient({
					to: [user.email],
					templateDatas: {
						firstName: userInfo.firstName,
						token: newToken,
					},
				});

				throw new Error("Token expired");
			}

			// Update user status
			await this.userService.update(user.id, {
				isVerified: true,
			});

			await session.commitTransaction();

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.NO_CONTENT,
				subject: "auth",
				data: {},
			});
		} catch (error) {
			await session.abortTransaction();
			console.error(`AuthController > ${path} : `, error);

			if (
				error.message === "User not found" ||
				error.message === "Client not found"
			) {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.NOT_FOUND,
					subject: "auth",
					error: error.message,
				});
			} else if (error.message === "Invalid token") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.BAD_REQUEST,
					subject: "auth",
					error: "Invalid token",
				});
			} else if (error.message === "Token expired") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.GONE,
					subject: "auth",
					error: "Token expired",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while confirming the account",
			});
		} finally {
			session.endSession();
		}
	}

	/**
	 * Regenerate access token using refresh token
	 * @param refreshTokenDto : RefreshTokenDto
	 * @param res : Response
	 * @returns : Response
	 */
	@ApiOperation({ summary: "Regenerate access token using refresh token" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Access token successfully regenerated.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid refresh token.",
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "Unauthorized - Refresh token is expired or invalid.",
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
	})
	@Post("refresh-token")
	async refreshToken(
		@Body() refreshTokenDto: RefreshTokenDto,
		@Res() res: FastifyReply,
	) {
		const { refreshToken } = refreshTokenDto;
		const path = "refresh-token";
		const method = "Post";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Verify token
			const decoded = Token.verifyToken(
				refreshToken,
				TokenTypeEnum.REFRESH,
			);

			if (!decoded) {
				throw new Error("Invalid token");
			}

			// Find user
			const user = await this.userService.findOneById(
				decoded.sub.toString(),
			);

			if (!user) {
				throw new Error("User not found");
			}

			// Check if token is expired
			const isExpired = Token.isTokenExpired(refreshToken);

			if (isExpired) {
				throw new Error("Invalid or expired refresh token");
			}

			// Generate new access token
			const newAccessToken = Token.generateAccessToken({
				sub: user._id,
				email: user.email,
			});

			await session.commitTransaction();

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: "auth",
				data: { access_token: newAccessToken },
			});
		} catch (error) {
			await session.abortTransaction();
			console.error(`AuthController > ${path} : `, error);

			if (error.message === "User not found") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.BAD_REQUEST,
					subject: "auth",
					error: "User not found",
				});
			} else if (error.message === "Expired refresh token") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.UNAUTHORIZED,
					subject: "auth",
					error: "Expired refresh token",
				});
			} else if (error.message === "Invalid token") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.BAD_REQUEST,
					subject: "auth",
					error: "Invalid token",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while confirming the account",
			});
		} finally {
			session.endSession();
		}
	}

	/**
	 * Init or init password
	 * @param initPasswordDto : InitPasswordDto
	 * @param res : Response
	 * @returns : Response
	 */
	@ApiOperation({ summary: "Init or init password" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Password successfully init or initialized.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid token or invalid input data.",
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "Unauthorized - Invalid or expired token.",
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
	})
	@Put("init-password")
	async initPassword(
		@Body() initPasswordDto: InitPasswordDto,
		@Res() res: FastifyReply,
	) {
		const { token, newPassword } = initPasswordDto;
		const path = "init-password";
		const method = "Post";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Verify token
			const decoded = Token.verifyToken(token);

			if (!decoded) {
				throw new Error("Invalid token");
			}

			// Find user
			const user = await this.userService.findOneById(
				decoded.sub.toString(),
			);

			if (!user) {
				throw new Error("User not found");
			}

			// Hash password
			user.password = await Hash.hashData(newPassword);

			// Update password
			const updatePassword = await this.userService.update(
				user._id.toString(),
				{ password: user.password, status: UserStatusEnum.AVAILABLE },
			);

			if (!updatePassword) {
				throw new Error("The password could not be updated");
			}

			await session.commitTransaction();

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: "auth",
				data: { message: "Password successfully init or initialized" },
			});
		} catch (error) {
			await session.abortTransaction();

			console.error(`AuthController > ${path} : `, error);

			if (error.message === "User not found") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.UNAUTHORIZED,
					subject: "auth",
					error: "Invalid user associated with this token",
				});
			} else if (error.message === "Invalid token") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.BAD_REQUEST,
					subject: "auth",
					error: "Invalid token",
				});
			} else if (error.message === "The password could not be updated") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: "auth",
					error: "The password could not be updated",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while initing the password",
			});
		} finally {
			session.endSession();
		}
	}

	/**
	 * Forgot Password
	 * @param forgotPasswordDto : ForgotPasswordDto
	 * @param res : Response
	 * @param ip : string
	 * @returns : Response
	 */
	@ApiOperation({ summary: "Forgot Password" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Password init link sent to the user's email.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request - Invalid email provided.",
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Not Found - User with this email does not exist.",
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal Server Error - Something went wrong.",
	})
	@Post("forgot-password")
	async forgotPassword(
		@Body() forgotPasswordDto: ForgotPasswordDto,
		@Res() res: FastifyReply,
		@Req() req: FastifyRequest,
		@Ip() ip: string,
	) {
		const { email } = forgotPasswordDto;
		const path = "forgot-password";
		const method = "Post";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Find user
			const user = await this.userService.findOne({
				email,
			});

			// Check if user exists
			if (user) {
				const payload = {
					sub: user._id,
					email: user.email,
					type: TokenTypeEnum.RESET_PASSWORD,
				};
				const initToken = Token.generateToken(payload);

				// Send email
				const sendEmail = await this.mailHelper.sendInitPasswordEmail({
					to: [user.email],
					templateDatas: {
						token: initToken,
					},
				});

				if (!sendEmail) {
					throw new Error("Email could not be sent");
				}
			}

			// Log the password init
			// try {
			// 	const client = await this.clientService.findOne({
			// 		userId: user._id.toString(),
			// 	});

			// 	if (!client) {
			// 		throw new Error("Client not found");
			// 	}
			// } catch (logError) {
			// 	console.error(`Failed to create log in ${path}: `, logError);
			// }

			await session.commitTransaction();

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: "auth",
				data: {
					message:
						"If this account exist, the password init link sent to the user's email",
				},
			});
		} catch (error) {
			await session.abortTransaction();

			console.error(`AuthController > ${path} : `, error);

			if (
				error.message.includes("E11000 duplicate key error collection")
			) {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.BAD_REQUEST,
					subject: "auth",
					error: "Duplicate key error",
				});
			} else if (error.message === "User not found") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.NOT_FOUND,
					subject: "auth",
					error: "User with this email does not exist",
				});
			} else if (error.message === "Email could not be sent") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: "auth",
					error: "Email could not be sent",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while processing your request",
			});
		} finally {
			session.endSession();
		}
	}
}
