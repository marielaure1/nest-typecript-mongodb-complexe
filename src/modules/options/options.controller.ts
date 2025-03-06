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
} from "@nestjs/swagger";

// Dependencies
import type { Response, Request } from "express";
import { Connection } from "mongoose";

// Services
import { OptionsService } from "@modules/options/options.service";

// Dtos
import { UpdateOptionDto } from "@modules/options/dto/update-option.dto";

// Entities
import { OptionDocument } from "@modules/options/entities/option.entity";

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
import { OptionFeaturesService } from "@modules/option-features/option-features.service";

@ApiTags("options")
@Controller("options")
@UseInterceptors(LogInterceptor)
export class OptionsController extends AppController<
	OptionDocument,
	null,
	UpdateOptionDto
> {
	/**
	 * Creates an instance of OptionsController.
	 *
	 * @param {optionsService} optionsService - The service handling user operations.
	 * @param {Connection} connection - The database connection instance.
	 * @param {LogsHelper} logsHelper - The helper service for logging.
	 */
	constructor(
		private readonly optionsService: OptionsService,
		public readonly connection: Connection,
		private readonly logsHelper: LogsHelper,
		private readonly optionFeaturesService: OptionFeaturesService,
	) {
		super(optionsService, "options", connection);
	}
	// @Post()
	async create(
		@Body() createOptionDto: null,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.create(createOptionDto, res, req, ip);
	}

	@ApiOperation({ summary: "Get all options" })
	@ApiResponse({ status: 200, description: "Return all options." })
	@ApiResponse({ status: 404, description: "Options not found." })
	@Get()
	async findAll(@Res() res: Response, @Req() req: Request, @Ip() ip: string) {
		return super.findAll(res, req, ip);
	}

	@ApiOperation({ summary: "Get a option by id" })
	@ApiResponse({ status: 200, description: "Return a option." })
	@ApiResponse({ status: 404, description: "Option not found." })
	@Get(":id")
	async findOne(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.findOne(id, res, req, ip);
	}

	@ApiOperation({ summary: "Update a option by id" })
	@ApiResponse({
		status: 200,
		description: "The option has been successfully updated.",
	})
	@ApiResponse({ status: 404, description: "Option not found." })
	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateOptionDto: UpdateOptionDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.update(id, updateOptionDto, res, req, ip);
	}

	// @Delete(":id")
	async remove(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.remove(id, res, req, ip);
	}

	@Get(":id/features")
	async getPlanOptionsFeatures(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		try {
			const optionFeatures = await this.optionFeaturesService.findWhere({
				where: {
					optionId: id,
				},
			});

			if (!optionFeatures) {
				throw new Error("Option plan not Found");
			}

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				message: "Options plan retrived succesfully.",
				data: {
					optionFeatures,
				},
			});
		} catch (error: any) {
			if (error.message == "Option plan not Found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: "Options plan not found.",
					errorDatas: error,
				});
			}

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: "An error occurred while getPlanOptions.",
				errorDatas: error,
			});
		}
	}
}
