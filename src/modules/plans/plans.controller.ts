import { Body, Controller, HttpStatus, Ip, Post, Req, Res } from "@nestjs/common";
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
import { Response } from "express";
import { StripeProductService } from "@services/stripe/product/stripe-product.service";
import { StripePriceService } from "@services/stripe/price/stripe-price.service";
import { LogsService } from "@modules/logs/logs.service";
import { Responses } from "@helpers/responses.helper";
import { LogLevelEnum } from "@enums/logs.enum";

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
		private readonly logsService: LogsService,
	) {
		super(plansService, "plans");
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
	async createPlan(
		@Body() createPlanDto: CreatePlanDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const path = "register";
		const method = "Post";

		const { user, client } = req;

		try {
			// Create a stripe product
			const stripeProduct = await this.stripeProductService.create(createPlanDto);

			if(!stripeProduct){
				throw new Error("Failed to create stripe product");
			}

			try {
				await this.logsService.create({
					ip,
					userId: user._id.toString(),
					firstName: client.firstName,
					lastName: client.lastName,
					level: LogLevelEnum.INFO,
					message: "Stripe product successfully registered",
					context: `PlansController > ${path}: `,
					metadata: { user, client },
				});
			} catch (logError) {
				console.error(`Failed to create log in ${path}: `, logError);
			}

			return super.create(createPlanDto, res);
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
