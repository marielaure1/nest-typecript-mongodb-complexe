import {
	Body,
	Controller,
	HttpStatus,
	Ip,
	Post,
	Req,
	Res,
} from "@nestjs/common";
import { PlansService } from "@modules/plans/plans.service";
import { CreatePlanDto } from "@modules/plans/dto/create-plan.dto";
import { UpdatePlanDto } from "@modules/plans/dto/update-plan.dto";
import { PlanDocument } from "@modules/plans/entities/plan.entity";
import { AppController } from "src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { Response, Request } from "express";
import { StripeProductService } from "@src/providers/stripe/product/stripe-product.service";
import { StripePriceService } from "@src/providers/stripe/price/stripe-price.service";
import { LogsService } from "@modules/logs/logs.service";
import { LogHelper } from "@modules/logs/helpers/log.helper";
import { Responses } from "@helpers/responses.helper";
import { LogLevelEnum } from "@enums/log-level.enum";
import { Connection } from "mongoose";

@ApiTags("plans")
@Controller("plans")
export class PlansController extends AppController<
	PlanDocument,
	CreatePlanDto,
	UpdatePlanDto
> {
	constructor(
		private readonly plansService: PlansService,
		private readonly stripeProductService: StripeProductService,
		private readonly stripePriceService: StripePriceService,
		connection: Connection,
		logHelper: LogHelper,
	) {
		super(plansService, "plans", connection, logHelper);
	}

	@ApiOperation({ summary: "Create a new plan" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The plan has been successfully created.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request.",
	})
	@ApiBearerAuth()
	@Post()
	async create(
		@Body() createPlanDto: CreatePlanDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const path = "register";
		const method = "Post";

		try {
			// Create a stripe product
			const stripeProduct =
				await this.stripeProductService.create(createPlanDto);

			if (!stripeProduct) {
				throw new Error("Failed to create stripe product");
			}

			this.logHelper.log({
				ip: ip,
				user: req["user"],
				userInfos: req["userInfos"],
				level: LogLevelEnum.INFO,
				message: "Stripe product successfully registered",
				context: `PlansController > ${path}: `,
				metadata: { user: req["user"], client: req["userInfos"] },
			});

			return super.create(createPlanDto, res, req, ip);
		} catch (error) {
			console.error(`PlansController > ${path} : `, error);

			if (error.message === "Failed to create stripe product") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: "plans",
					error: "Failed to create stripe product",
				});
			}

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "auth",
				error: "An error occurred while creating the stripe product",
			});
		}
	}
}
