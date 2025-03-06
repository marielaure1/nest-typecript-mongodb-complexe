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

import { TeamsService } from "@modules/teams/teams.service";

// Dtos

import { CreateTeamDto } from "@modules/teams/dto/create-team.dto";
import { UpdateTeamDto } from "@modules/teams/dto/update-team.dto";

// Entities

import { TeamDocument } from "@modules/teams/entities/team.entity";

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

@ApiTags("teams")
@Controller("teams")
@UseInterceptors(LogInterceptor)
export class TeamsController extends AppController<
	TeamDocument,
	CreateTeamDto,
	UpdateTeamDto
> {
	/**
	 * Creates an instance of AuthController.
	 *
	 * @param {teamsService} TeamsService - The service handling user operations.
	 * @param {Connection} connection - The database connection instance.
	 * @param {LogsHelper} logsHelper - The helper service for logging.
	 */
	constructor(
		private readonly teamsService: TeamsService,
		public readonly connection: Connection,
		private readonly logsHelper: LogsHelper,
	) {
		super(teamsService, "teams", connection);
	}

	@ApiOperation({ summary: "Create a new team" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The team has been successfully created.",
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
					error: "An error occurred while creating the team.",
				},
			},
		},
	})
	@ApiBearerAuth()
	@Post()
	async create(
		@Body() createTeamDto: CreateTeamDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.create(createTeamDto, res, req, ip);
	}

	@ApiOperation({ summary: "Get all teams" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Return all teams.",
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
					error: "Teams not found.",
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
					error: "An error occurred while creating the team.",
				},
			},
		},
	})
	@ApiBearerAuth()
	@Get()
	async findAll(@Res() res: Response, @Req() req: Request, @Ip() ip: string) {
		return super.findAll(res, req, ip);
	}

	@ApiOperation({ summary: "Get a team by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Return a team.",
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
					error: "Team not found.",
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
					error: "An error occurred while creating the team.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the team.",
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

	@ApiOperation({ summary: "Update a team by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The team has been successfully updated.",
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
					error: "Team not found.",
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
					error: "An error occurred while creating the team.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the team.",
		required: true,
		example: "6776adeb12733b2334e9004b",
	})
	@ApiBearerAuth()
	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateTeamDto: UpdateTeamDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.update(id, updateTeamDto, res, req, ip);
	}

	@ApiOperation({ summary: "Delete a team by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The team has been successfully deleted.",
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
					error: "Team not found.",
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
					error: "An error occurred while creating the team.",
				},
			},
		},
	})
	@ApiParam({
		name: "id",
		type: String,
		description: "The id of the team.",
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
