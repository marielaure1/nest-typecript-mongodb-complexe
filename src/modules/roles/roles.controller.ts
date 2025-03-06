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

import { RolesService } from "@modules/roles/roles.service";

// Dtos

import { CreateRoleDto } from "@modules/roles/dto/create-role.dto";
import { UpdateRoleDto } from "@modules/roles/dto/update-role.dto";

// Entities

import { RoleDocument } from "@modules/roles/entities/role.entity";

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
import { RolePermissionsService } from "@modules/role-permissions/role-permissions.service";
import { UserRolesService } from "@modules/user-roles/user-roles.service";
import { UserPermissionsService } from "@modules/user-permissions/user-permissions.service";

@ApiTags("roles")
@Controller("roles")
@UseInterceptors(LogInterceptor)
export class RolesController extends AppController<
	RoleDocument,
	CreateRoleDto,
	UpdateRoleDto
> {
	/**
	 * Creates an instance of AuthController.
	 *
	 * @param {rolesService} RolesService - The service handling user operations.
	 * @param {Connection} connection - The database connection instance.
	 * @param {LogsHelper} logsHelper - The helper service for logging.
	 */
	constructor(
		private readonly rolesService: RolesService,
		private readonly rolePermissionsService: RolePermissionsService,
		private readonly userRolesService: UserRolesService,
		private readonly userPermissionsService: UserPermissionsService,
		public readonly connection: Connection,
		private readonly logsHelper: LogsHelper,
	) {
		super(rolesService, "roles", connection);
	}

	@ApiOperation({ summary: "Create a new role" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The role has been successfully created.",
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
							field: "name",
							value: "admin",
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
					error: "An error occurred while creating the role.",
				},
			},
		},
	})
	@ApiBearerAuth()
	@Post()
	async create(
		@Body() createRoleDto: CreateRoleDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		if (createRoleDto?.isStaff) {
			createRoleDto.establishmentId = null;
		}

		createRoleDto.name = createRoleDto.name.toUpperCase();

		return super.create(createRoleDto, res, req, ip);
	}

	@ApiOperation({ summary: "Get all roles" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Return all roles.",
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
					error: "Roles not found.",
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
					error: "An error occurred while creating the role.",
				},
			},
		},
	})
	@ApiBearerAuth()
	@Get()
	async findAll(@Res() res: Response, @Req() req: Request, @Ip() ip: string) {
		return super.findAll(res, req, ip);
	}

	@ApiOperation({ summary: "Get a role by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Return a role.",
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
					error: "Role not found.",
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
					error: "An error occurred while creating the role.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the role.",
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

	@ApiOperation({ summary: "Update a role by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The role has been successfully updated.",
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
					error: "Role not found.",
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
							field: "name",
							value: "Admin",
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
					error: "An error occurred while creating the role.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the role.",
		required: true,
		example: "6776adeb12733b2334e9004b",
	})
	@ApiBearerAuth()
	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateRoleDto: UpdateRoleDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		if (updateRoleDto?.isStaff) {
			updateRoleDto.establishmentId = null;
		}

		return super.update(id, updateRoleDto, res, req, ip);
	}

	@ApiOperation({ summary: "Delete a role by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The role has been successfully deleted.",
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
					error: "Role not found.",
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
					error: "An error occurred while creating the role.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the role.",
		required: true,
		example: "6776adeb12733b2334e9004b",
	})
	@ApiBearerAuth()
	@Delete(":id/:newRoleId?")
	async remove(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
		@Param("newRoleId") newRoleId?: string,
	) {
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			const userInfos = req["userInfos"];
			const role = await this.rolesService.findOneById({ id, session });

			if (!role?.isStaff) {
				if (!role.establishmentId || role.establishmentId === null) {
					throw new Error("Predefined role");
				}

				if (!userInfos?.teams) {
					throw new Error("Not allowed to delete this role");
				}

				const isAllowed = userInfos.teams.find(
					(team) => team.establishmentId === role.establishmentId,
				);

				if (!isAllowed) {
					throw new Error("Not allowed to delete this role");
				}
			}

			const userRoles = await this.userRolesService.findWhere({
				where: {
					find: {
						roleId: id,
					},
				},
				session,
			});

			const rolePermissions = await this.rolePermissionsService.findWhere(
				{
					where: {
						find: {
							roleId: id,
						},
					},
					session,
				},
			);

			if (userRoles || rolePermissions) {
				if (!newRoleId) {
					throw new Error("Role is used by at least one user");
				}

				if (userRoles) {
					await this.userRolesService.updateMany({
						where: {
							find: {
								id,
							},
						},
						updateDto: {
							roleId: newRoleId,
						},
						session,
					});
				}

				if (rolePermissions) {
					await this.rolePermissionsService.removeMany({
						where: {
							find: {
								roleId: id,
							},
						},
						session,
					});
				}
			}

			super.remove(id, res, req, ip);

			session.commitTransaction();
		} catch (error) {
			session.abortTransaction();

			if (error.message === "Predefined role") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.CONFLICT,
					error: "This role is predefined and cannot be deleted.",
					errorDatas: error,
				});
			} else if (error.message === "Not allowed to delete this role") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.FORBIDDEN,
					error: "You are not allowed to delete this role.",
					errorDatas: error,
				});
			} else if (error.message === "Role is used by at least one user") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.CONFLICT,
					error: "This role is used by at least one user, please provide a new role id.",
					errorDatas: error,
				});
			}

			return Responses.getResponse({
				req,
				res,
				status: 500,
				error: "An error occurred while removing the role.",
				errorDatas: error,
			});
		} finally {
			session.endSession();
		}
	}

	// TODO: Roles d'un établishment
	// TODO: Roles du staff
	// TODO: Permissions d'un role
	// TODO: Role d'un user dans un établishment
}
