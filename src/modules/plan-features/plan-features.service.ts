// Base
import { Injectable, Logger } from "@nestjs/common";

// Dependencies
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Dtos
import { CreateProductWebhookStripeDto } from "@providers/stripe/dto/create-product-webhook-stripe.dto";
import { UpdatePlanFeatureDto } from "@modules/plan-features/dto/update-plan-feature.dto";
import { UpdatePlanFeatureWebhookStripeDto } from "@modules/plan-features/dto/update-plan-feature-webhook-stripe.dto";

// Entities
import {
	PlanFeature,
	PlanFeatureDocument,
} from "@modules/plan-features/entities/plan-feature.entity";

// Services
import { AppService } from "@src/app.service";

@Injectable()
export class PlanFeaturesService extends AppService<
	PlanFeatureDocument,
	CreateProductWebhookStripeDto,
	UpdatePlanFeatureDto | UpdatePlanFeatureWebhookStripeDto
> {
	private readonly logger = new Logger(PlanFeaturesService.name);

	constructor(
		@InjectModel(PlanFeature.name)
		private planFeaturesModel: Model<PlanFeatureDocument>,
	) {
		super(planFeaturesModel);
	}
}
