// Base
import { Injectable, Logger } from "@nestjs/common";

// Dependencies
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Dtos
import { CreatePlanOptionFeatureDto } from "@modules/plan-option-features/dto/create-plan-option-feature.dto";
import { UpdatePlanOptionFeatureDto } from "@modules/plan-option-features/dto/update-plan-option-feature.dto";

// Entities

import {
	PlanOptionFeature,
	PlanOptionFeatureDocument,
} from "@modules/plan-option-features/entities/plan-option-feature.entity";

// Services

import { AppService } from "@src/app.service";

@Injectable()
export class PlanOptionFeaturesService extends AppService<
	PlanOptionFeatureDocument,
	CreatePlanOptionFeatureDto,
	UpdatePlanOptionFeatureDto
> {
	private readonly logger = new Logger(PlanOptionFeaturesService.name);

	constructor(
		@InjectModel(PlanOptionFeature.name)
		private planOptionFeaturesModel: Model<PlanOptionFeatureDocument>,
	) {
		super(planOptionFeaturesModel);
	}
}
