import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Inject,
	Ip,
	Logger,
	Param,
	Post,
	Put,
	Req,
	Res,
} from "@nestjs/common";
import { PlansService } from "@modules/plans/plans.service";
import { UpdatePlanDto } from "@modules/plans/dto/update-plan.dto";
import { PlanDocument } from "@modules/plans/entities/plan.entity";
import { AppController } from "@src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import type { Response, Request } from "express";
import { LogsService } from "@modules/logs/logs.service";
import { Responses } from "@helpers/responses.helper";
import { LogLevelEnum } from "@modules/logs/enums/log-level.enum";
import mongoose, { Connection } from "mongoose";
import Stripe from "stripe";
import { StringHelper } from "@helpers/string.helper";
import { CreateProductWebhookStripeDto } from "@providers/stripe/dto/create-product-webhook-stripe.dto";
import { PlanOptionFeaturesService } from "@modules/plan-option-features/plan-option-features.service";

let logger = new Logger();

@ApiTags("plans")
@Controller("plans")
export class PlansController extends AppController<
	PlanDocument,
	null,
	UpdatePlanDto
> {
	constructor(
		private readonly plansService: PlansService,
		public readonly connection: Connection,
		@Inject("STRIPE_CLIENT") private readonly stripe: Stripe,
		private readonly planOptionFeaturesService: PlanOptionFeaturesService,
	) {
		super(plansService, "plans", connection);
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

	// @ApiOperation({ summary: "Create a new plan" })
	// @ApiResponse({
	// 	status: HttpStatus.CREATED,
	// 	description: "The plan has been successfully created.",
	// })
	// @ApiResponse({
	// 	status: HttpStatus.BAD_REQUEST,
	// 	description: "Bad Request.",
	// })
	// @ApiBearerAuth()
	@Get()
	async findAll(@Res() res: Response, @Req() req: Request, @Ip() ip: string) {
		try {
			const plan = await this.plansService.findAll({});
			// Create a stripe product
			// const stripeProduct = await this.stripeProductService.list();

			// if (!stripeProduct) {
			// 	throw new Error("Failed to create stripe product");
			// }

			// this.logHelper.log({
			// 	ip: ip,
			// 	user: req["user"],
			// 	userInfos: req["userInfos"],
			// 	level: LogLevelEnum.INFO,
			// 	message: "Stripe product successfully registered",
			// 	context: `PlansController > ${path}: `,
			// 	metadata: { user: req["user"], client: req["userInfos"] },
			// });

			// return super.create(createPlanDto, res);

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				data: {
					message: "stripe!",
					plan,
				},
			});
		} catch (error: any) {
			// if (error.message === "Failed to create stripe product") {
			// 	return Responses.getResponse({
			// 		res,
			// 		path,
			// 		method,
			// 		status: HttpStatus.INTERNAL_SERVER_ERROR,
			// 		subject: "plans",
			// 		error: "Failed to create stripe product",
			// 	});
			// }

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: "An error occurred while retrieve the plans",
				errorDatas: error,
			});
		}
	}

	@Get(":id")
	async findOne(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		try {
			const plan: PlanDocument = await this.plansService.findOneById({
				id,
			});

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				data: {
					plan,
				},
			});
		} catch (error: any) {
			// if (error.message === "Failed to create stripe product") {
			// 	return Responses.getResponse({
			// 		res,
			// 		path,
			// 		method,
			// 		status: HttpStatus.INTERNAL_SERVER_ERROR,
			// 		subject: "plans",
			// 		error: "Failed to create stripe product",
			// 	});
			// }

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: "An error occurred while retrieve the plans",
				errorDatas: error,
			});
		}
	}

	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updatePlanDto: UpdatePlanDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.update(id, updatePlanDto, res, req, ip);
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

	@Get(":id/options")
	async getPlanOptions(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		try {
			const planOptionFeatures =
				await this.planOptionFeaturesService.findWhere({
					where: {
						planId: id,
						featureId: null,
					},
				});

			if (!planOptionFeatures) {
				throw new Error("Option plan not Found");
			}

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				message: "Options plan retrived succesfully.",
				data: {
					planOptionFeatures,
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

	@Get(":id/options/:optionId/features")
	async getPlanOptionsFeatures(
		@Param("id") id: string,
		@Param("optionId") optionId: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		try {
			const planOptionFeatures =
				await this.planOptionFeaturesService.findWhere({
					where: {
						planId: id,
						optionId,
						$nor: [
							{ featureId: null },
							{ featureId: { $exists: false } },
						],
					},
				});

			if (!planOptionFeatures) {
				throw new Error("Option plan not Found");
			}

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				message: "Options plan retrived succesfully.",
				data: {
					planOptionFeatures,
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
