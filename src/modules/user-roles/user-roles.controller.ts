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

import { UserRolesService } from "@modules/user-roles/user-roles.service";

// Dtos

import { CreateUserRoleDto } from "@modules/user-roles/dto/create-user-role.dto";
import { UpdateUserRoleDto } from "@modules/user-roles/dto/update-user-role.dto";

// Entities

import { UserRoleDocument } from "@modules/user-roles/entities/user-role.entity";

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

@ApiTags("user-roles")
@Controller("user-roles")
@UseInterceptors(LogInterceptor)
export class UserRolesController extends AppController<
	UserRoleDocument,
	CreateUserRoleDto,
	UpdateUserRoleDto
> {
	/**
	 * Creates an instance of AuthController.
	 *
	 * @param {UserRolesService} UserRolesService - The service handling user operations.
	 * @param {Connection} connection - The database connection instance.
	 * @param {LogsHelper} logsHelper - The helper service for logging.
	 */
	constructor(
		private readonly UserRolesService: UserRolesService,
		public readonly connection: Connection,
		private readonly logsHelper: LogsHelper,
	) {
		super(UserRolesService, "UserRoles", connection);
	}

	@ApiOperation({ summary: "Create a new UserRole" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The UserRole has been successfully created.",
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
					error: "An error occurred while creating the UserRole.",
				},
			},
		},
	})
	@ApiBearerAuth()
	@Post()
	async create(
		@Body() createUserRoleDto: CreateUserRoleDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.create(createUserRoleDto, res, req, ip);
	}

	@ApiOperation({ summary: "Get all user-roles" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Return all user-roles.",
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
					error: "UserRoles not found.",
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
					error: "An error occurred while creating the UserRole.",
				},
			},
		},
	})
	@ApiBearerAuth()
	@Get()
	async findAll(@Res() res: Response, @Req() req: Request, @Ip() ip: string) {
		return super.findAll(res, req, ip);
	}

	@ApiOperation({ summary: "Get a user-role by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Return a user-role.",
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
					error: "UserRole not found.",
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
					error: "An error occurred while creating the UserRole.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the UserRole.",
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

	@ApiOperation({ summary: "Update a user-role by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The user-role has been successfully updated.",
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
					error: "UserRole not found.",
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
					error: "An error occurred while creating the UserRole.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the UserRole.",
		required: true,
		example: "6776adeb12733b2334e9004b",
	})
	@ApiBearerAuth()
	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateUserRoleDto: UpdateUserRoleDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.update(id, updateUserRoleDto, res, req, ip);
	}

	@ApiOperation({ summary: "Delete a user-role by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The user-role has been successfully deleted.",
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
					error: "UserRole not found.",
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
					error: "An error occurred while creating the UserRole.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the UserRole.",
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
