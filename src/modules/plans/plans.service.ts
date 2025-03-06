// Base
import { Injectable, Logger } from "@nestjs/common";

// Dependencies
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Dtos
import { UpdatePlanDto } from "@modules/plans/dto/update-plan.dto";
import { UpdatePlanWebhookStripeDto } from "@modules/plans/dto/update-plan-webhook-stripe.dto";
import { CreateProductWebhookStripeDto } from "@providers/stripe/dto/create-product-webhook-stripe.dto";

// Entities
import { Plan, PlanDocument } from "@modules/plans/entities/plan.entity";

// Services
import { AppService } from "@src/app.service";

@Injectable()
export class PlansService extends AppService<
	PlanDocument,
	CreateProductWebhookStripeDto,
	UpdatePlanDto | UpdatePlanWebhookStripeDto
> {
	constructor(
		@InjectModel(Plan.name) private plansModel: Model<PlanDocument>,
	) {
		super(plansModel);
	}
}
