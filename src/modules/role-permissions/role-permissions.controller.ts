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
import { RolePermissionsService } from "@modules/role-permissions/role-permissions.service";
import { RolesService } from "@modules/roles/roles.service";
import { PermissionsService } from "@modules/permissions/permissions.service";
import { EstablishmentsService } from "@modules/establishments/establishments.service";
import { TeamsService } from "@modules/teams/teams.service";

// Dtos
import { CreateRolePermissionDto } from "@modules/role-permissions/dto/create-role-permission.dto";
import { UpdateRolePermissionDto } from "@modules/role-permissions/dto/update-role-permission.dto";

// Entities
import { RolePermissionDocument } from "@modules/role-permissions/entities/role-permission.entity";

// Controllers
import { AppController } from "@src/app.controller";

// Guards
// import { AuthGuard } from "@guards/auth.guard";

// Helpers
import { Responses } from "@helpers/responses.helper";
import { LogsHelper } from "@modules/logs/helpers/logs.helper";

// Interceptors
import { LogInterceptor } from "@interceptors/log.interceptor";

// Enums
import { NodeEnvEnum } from "@enums/configs/node-env.enum";

@ApiTags("role-permissions")
@Controller("role-permissions")
@UseInterceptors(LogInterceptor)
export class RolePermissionsController extends AppController<
	RolePermissionDocument,
	CreateRolePermissionDto,
	UpdateRolePermissionDto
> {
	/**
	 * Creates an instance of AuthController.
	 *
	 * @param {rolePermissionsService} RolePermissionsService - The service handling user operations.
	 * @param {rolesService} RolesService - The service handling user operations.
	 * @param {permissionsService} PermissionsService - The service handling user operations.
	 * @param {establishmentsService} EstablishmentsService - The service handling user operations.
	 * @param {Connection} connection - The database connection instance.
	 * @param {LogsHelper} logsHelper - The helper service for logging.
	 */
	constructor(
		private readonly rolePermissionsService: RolePermissionsService,
		private readonly rolesService: RolesService,
		private readonly permissionsService: PermissionsService,
		private readonly establishmentsService: EstablishmentsService,
		private readonly teamsService: TeamsService,
		public readonly connection: Connection,
		private readonly logsHelper: LogsHelper,
	) {
		super(rolePermissionsService, "rolePermissions", connection);
	}

	@ApiOperation({ summary: "Create a new rolePermission" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The rolePermission has been successfully created.",
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
					error: "An error occurred while creating the rolePermission.",
				},
			},
		},
	})
	@ApiBearerAuth()
	@Post()
	async create(
		@Body() createRolePermissionDto: CreateRolePermissionDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		try {
			const userInfos = req["userInfos"];

			const role = await this.rolesService.findOneById({
				id: createRolePermissionDto.roleId,
			});

			if (!role) {
				throw new Error("Role not found");
			}

			const permission = await this.permissionsService.findOneById({
				id: createRolePermissionDto.permissionId,
			});

			if (!permission) {
				throw new Error("Permission not found");
			}

			if (createRolePermissionDto.establishmentId) {
				const establishment =
					await this.establishmentsService.findOneById({
						id: createRolePermissionDto.establishmentId,
					});

				if (!establishment) {
					throw new Error("Establishment not found");
				}

				const team = await this.teamsService.findOne({
					filter: {
						establishmentId:
							createRolePermissionDto.establishmentId,
						userId: userInfos?.user?._id?.toString(),
					},
				});

				if (!team) {
					throw new Error("You are not part of this establishment");
				}
			}

			const rolePermission = await this.rolePermissionsService.findOne({
				filter: {
					roleId: createRolePermissionDto.roleId,
					permissionId: createRolePermissionDto.permissionId,
					establishmentId:
						createRolePermissionDto.establishmentId || null,
				},
			});

			if (rolePermission) {
				throw new Error("RolePermission already exists");
			}
			return super.create(createRolePermissionDto, res, req, ip);
		} catch (error) {
			if (error.message === "Role not found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: "Role not found.",
					errorDatas: error,
				});
			} else if (error.message === "Permission not found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: "Permission not found.",
					errorDatas: error,
				});
			} else if (error.message === "RolePermission already exists") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.CONFLICT,
					error: "RolePermission already exists.",
					errorDatas: error,
				});
			} else if (error.message === "Establishment not found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: "Establishment not found.",
					errorDatas: error,
				});
			} else if (
				error.message === "You are not part of this establishment"
			) {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.UNAUTHORIZED,
					error: "You are not part of this establishment.",
					errorDatas: error,
				});
			}

			return Responses.getResponse({
				req,
				res,
				status: 500,
				error: "An error occurred while creating the rolePermission.",
				errorDatas: error,
			});
		}
	}

	/**
	 * Create many role-permissions
	 * @param res
	 * @param req
	 * @param ip
	 * @returns
	 */
	@ApiOperation({ summary: "Create many role-permissions" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The role-permissions have been successfully created.",
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
					error: "An error occurred while creating the rolePermissions.",
				},
			},
		},
	})
	@ApiBearerAuth()
	@Post("many")
	async createMany(
		@Body() createRolePermissionDtos: CreateRolePermissionDto[],
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			const userInfos = req["userInfos"];

			const role = await this.rolesService.findOneById({
				id: createRolePermissionDtos[0].roleId,
			});

			if (!role) {
				throw new Error("Role not found");
			}

			const permission = await this.permissionsService.findOneById({
				id: createRolePermissionDtos[0].permissionId,
			});

			if (!permission) {
				throw new Error("Permission not found");
			}

			// if(createRolePermissionDto[0].establishmentId){
			// 	const establishment = await this.establishmentsService.findOneById({
			// 		id: createRolePermissionDto[0].establishmentId,
			// 	});

			// 	if (!establishment) {
			// 		throw new Error("Establishment not found");
			// 	}

			// 	const team = await this.teamsService.findOne({
			// 		filter: {
			// 			establishmentId: createRolePermissionDto[0].establishmentId,
			// 			userId: userInfos?.user?._id?.toString(),
			// 		}
			// 	})

			// 	if(!team){
			// 		throw new Error("You are not part of this establishment")
			// 	}
			// }

			// const rolePermissions = await this.rolePermissionsService.find({
			// 	filter: {
			// 		roleId: createRolePermissionDto[0].roleId,
			// 		permissionId: createRolePermissionDto[0].permissionId,
			// 		establishmentId: createRolePermissionDto[0].establishmentId || null
			// 	}
			// });

			// if(rolePermissions.length > 0){
			// 	throw new Error("RolePermission already exists")
			// }

			// await this.rolePermissionsService.createMany({ createDtos: createRolePermissionDto, session });

			await session.commitTransaction();

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.CREATED,
				message: "The role-permissions have been successfully created.",
			});
		} catch (error) {
			if (error.message === "Role not found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: "Role not found.",
					errorDatas: error,
				});
			} else if (error.message === "Permission not found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: "Permission not found.",
					errorDatas: error,
				});
			} else if (error.message === "RolePermission already exists") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.CONFLICT,
					error: "RolePermission already exists.",
					errorDatas: error,
				});
			} else if (error.message === "Establishment not found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: "Establishment not found.",
					errorDatas: error,
				});
			} else if (
				error.message === "You are not part of this establishment"
			) {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.UNAUTHORIZED,
					error: "You are not part of this establishment.",
					errorDatas: error,
				});
			}

			return Responses.getResponse({
				req,
				res,
				status: 500,
				error: "An error occurred while creating the rolePermissions.",
				errorDatas: error,
			});
		}
	}

	@ApiOperation({ summary: "Get all role-permissions" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Return all role-permissions.",
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
					error: "RolePermissions not found.",
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
					error: "An error occurred while creating the rolePermission.",
				},
			},
		},
	})
	@ApiBearerAuth()
	@Get()
	async findAll(@Res() res: Response, @Req() req: Request, @Ip() ip: string) {
		return super.findAll(res, req, ip);
	}

	@ApiOperation({ summary: "Get a role-permission by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Return a role-permission.",
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
					error: "RolePermission not found.",
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
					error: "An error occurred while creating the rolePermission.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the rolePermission.",
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

	@ApiOperation({ summary: "Update a role-permission by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The role-permission has been successfully updated.",
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
					error: "RolePermission not found.",
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
					error: "An error occurred while creating the rolePermission.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the rolePermission.",
		required: true,
		example: "6776adeb12733b2334e9004b",
	})
	@ApiBearerAuth()
	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateRolePermissionDto: UpdateRolePermissionDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.update(id, updateRolePermissionDto, res, req, ip);
	}

	@ApiOperation({ summary: "Delete a role-permission by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The role-permission has been successfully deleted.",
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
					error: "RolePermission not found.",
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
					error: "An error occurred while creating the rolePermission.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the rolePermission.",
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

	// TODO: Get all staff permissions by role
	// TODO: Get all staff roles by permission
	// TODO: Get all permissions by role and establishment
	// TODO: Get all roles by permission and establishment
	//
}
