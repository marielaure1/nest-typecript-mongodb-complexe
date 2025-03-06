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
	Patch,
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

import { UserPermissionsService } from "@modules/user-permissions/user-permissions.service";

// Dtos

import { CreateUserPermissionDto } from "@modules/user-permissions/dto/create-user-permission.dto";
import { UpdateUserPermissionDto } from "@modules/user-permissions/dto/update-user-permission.dto";

// Entities

import { UserPermissionDocument } from "@modules/user-permissions/entities/user-permission.entity";

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

@ApiTags("user-permissions")
@Controller("user-permissions")
@UseInterceptors(LogInterceptor)
export class UserPermissionsController extends AppController<
	UserPermissionDocument,
	CreateUserPermissionDto,
	UpdateUserPermissionDto
> {
	/**
	 * Creates an instance of AuthController.
	 *
	 * @param {userPermissionsService} UserPermissionsService - The service handling user operations.
	 * @param {Connection} connection - The database connection instance.
	 * @param {LogsHelper} logsHelper - The helper service for logging.
	 */
	constructor(
		private readonly userPermissionsService: UserPermissionsService,
		public readonly connection: Connection,
		private readonly logsHelper: LogsHelper,
	) {
		super(userPermissionsService, "userPermissions", connection);
	}

	@ApiOperation({ summary: "Create a new userPermission" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The userPermission has been successfully created.",
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
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "Internal server error.",
		content: {
			"application/json": {
				example: {
					status: 500,
					success: false,
					error: "An error occurred while creating the userPermission.",
				},
			},
		},
	})
	@ApiBearerAuth()
	@Post()
	async create(
		@Body() createUserPermissionDto: CreateUserPermissionDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.create(createUserPermissionDto, res, req, ip);
	}

	@ApiOperation({ summary: "Get all user-permissions" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Return all user-permissions.",
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
					error: "UserPermissions not found.",
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
					error: "An error occurred while creating the userPermission.",
				},
			},
		},
	})
	@ApiBearerAuth()
	@Get()
	async findAll(@Res() res: Response, @Req() req: Request, @Ip() ip: string) {
		return super.findAll(res, req, ip);
	}

	@ApiOperation({ summary: "Get a user-permission by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Return a user-permission.",
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
					error: "UserPermission not found.",
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
					error: "An error occurred while creating the userPermission.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the userPermission.",
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

	@ApiOperation({ summary: "Update a user-permission by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The user-permission has been successfully updated.",
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
					error: "UserPermission not found.",
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
					error: "An error occurred while creating the userPermission.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the userPermission.",
		required: true,
		example: "6776adeb12733b2334e9004b",
	})
	@ApiBearerAuth()
	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateUserPermissionDto: UpdateUserPermissionDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.update(id, updateUserPermissionDto, res, req, ip);
	}

	@ApiOperation({ summary: "Delete a user-permission by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The user-permission has been successfully deleted.",
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
					error: "UserPermission not found.",
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
					error: "An error occurred while creating the userPermission.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the userPermission.",
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

	// TODO: Permissions d'un user dans un établishment
	// TODO: Get My Permissions
}
