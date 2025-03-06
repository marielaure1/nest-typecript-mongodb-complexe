// Base
import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Res,
	Put,
	Req,
	Ip,
	HttpStatus,
	UseInterceptors,
} from "@nestjs/common";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
	ApiParam,
} from "@nestjs/swagger";

// Dependencies
import type { Response, Request } from "express";
import { Connection } from "mongoose";

// Services
import { PermissionsService } from "@modules/permissions/permissions.service";

// Dtos
import { CreatePermissionDto } from "@modules/permissions/dto/create-permission.dto";
import { UpdatePermissionDto } from "@modules/permissions/dto/update-permission.dto";

// Entities
import { PermissionDocument } from "@modules/permissions/entities/permission.entity";

// Controller
import { AppController } from "@src/app.controller";

// Guards
// import { AuthGuard } from "@guards/auth.guard";

// Enums

// Helpers
import { Responses } from "@helpers/responses.helper";
import { LogsHelper } from "@modules/logs/helpers/logs.helper";

// Interceptor
import { LogInterceptor } from "@interceptors/log.interceptor";
import { NodeEnvEnum } from "@enums/configs/node-env.enum";

@ApiTags("permissions")
@Controller("permissions")
@UseInterceptors(LogInterceptor)
export class PermissionsController extends AppController<
	PermissionDocument,
	CreatePermissionDto,
	UpdatePermissionDto
> {
	/**
	 * Creates an instance of AuthController.
	 *
	 * @param {permissionsService} PermissionsService - The service handling user operations.
	 * @param {Connection} connection - The database connection instance.
	 * @param {LogsHelper} logsHelper - The helper service for logging.
	 */
	constructor(
		private readonly permissionsService: PermissionsService,
		public readonly connection: Connection,
		private readonly logsHelper: LogsHelper,
	) {
		super(permissionsService, "permissions", connection);
	}

	@ApiOperation({ summary: "Create a new permission" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The permission has been successfully created.",
		content: {
			"application/json": {
				example: {
					status: 201,
					success: true,
					data: {},
					message: "",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Invalid input data.",
		content: {
			"application/json": {
				example: {
					fieldsErrors: [{}],
					error: "Invalid credentials",
					status: 400,
					success: false,
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: "Duplicate key error",
		content: {
			"application/json": {
				example: {
					fieldsErrors: [
						{
							field: "code",
							value: "CREATE_USER",
						},
					],
					error: "Duplicate key error.",
					status: 409,
					success: false,
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal server error.",
		content: {
			"application/json": {
				example: {
					status: 500,
					success: false,
					error: "An error occurred while creating the permission.",
				},
			},
		},
	})
	@ApiBearerAuth()
	@Post()
	async create(
		@Body() createPermissionDto: CreatePermissionDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.create(createPermissionDto, res, req, ip);
	}

	@ApiOperation({ summary: "Get all permissions" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Return all permissions.",
		content: {
			"application/json": {
				example: {
					status: 200,
					success: true,
					data: {},
					message: "",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Not Found -  .",
		content: {
			"application/json": {
				example: {
					status: 404,
					success: false,
					error: "Permissions not found.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal server error.",
		content: {
			"application/json": {
				example: {
					status: 500,
					success: false,
					error: "An error occurred while creating the permission.",
				},
			},
		},
	})
	@ApiBearerAuth()
	@Get()
	async findAll(@Res() res: Response, @Req() req: Request, @Ip() ip: string) {
		return super.findAll(res, req, ip);
	}

	@ApiOperation({ summary: "Get a permission by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Return a permission.",
		content: {
			"application/json": {
				example: {
					status: 200,
					success: true,
					data: {},
					message: "",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Not Found -  .",
		content: {
			"application/json": {
				example: {
					status: 404,
					success: false,
					error: "Permission not found.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal server error.",
		content: {
			"application/json": {
				example: {
					status: 500,
					success: false,
					error: "An error occurred while creating the permission.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the permission.",
		required: true,
		example: "6776adeb12733b2334e9004b",
	})
	@ApiBearerAuth()
	@Get(":id")
	async findOne(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.findOne(id, res, req, ip);
	}

	@ApiOperation({ summary: "Update a permission by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The permission has been successfully updated.",
		content: {
			"application/json": {
				example: {
					status: 200,
					success: true,
					data: {},
					message: "",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Invalid input data.",
		content: {
			"application/json": {
				example: {
					fieldsErrors: [{}],
					error: "Invalid credentials",
					status: 400,
					success: false,
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Not Found -  .",
		content: {
			"application/json": {
				example: {
					status: 404,
					success: false,
					error: "Permission not found.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: "Duplicate key error",
		content: {
			"application/json": {
				example: {
					fieldsErrors: [
						{
							field: "code",
							value: "CREATE_USER",
						},
					],
					error: "Duplicate key error.",
					status: 409,
					success: false,
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal server error.",
		content: {
			"application/json": {
				example: {
					status: 500,
					success: false,
					error: "An error occurred while creating the permission.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the permission.",
		required: true,
		example: "6776adeb12733b2334e9004b",
	})
	@ApiBearerAuth()
	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updatePermissionDto: UpdatePermissionDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.update(id, updatePermissionDto, res, req, ip);
	}

	@ApiOperation({ summary: "Delete a permission by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The permission has been successfully deleted.",
		content: {
			"application/json": {
				example: {
					status: 200,
					success: true,
					data: {},
					message: "",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Invalid input data.",
		content: {
			"application/json": {
				example: {
					fieldsErrors: [{}],
					error: "Invalid credentials",
					status: 400,
					success: false,
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Not Found -  .",
		content: {
			"application/json": {
				example: {
					status: 404,
					success: false,
					error: "Permission not found.",
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal server error.",
		content: {
			"application/json": {
				example: {
					status: 500,
					success: false,
					error: "An error occurred while creating the permission.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the permission.",
		required: true,
		example: "6776adeb12733b2334e9004b",
	})
	@ApiBearerAuth()
	@Delete(":id")
	async remove(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.remove(id, res, req, ip);
	}
}
