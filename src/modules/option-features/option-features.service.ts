// Base
import { Injectable, Logger } from "@nestjs/common";

// Dependencies
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Dtos
import { CreateOptionFeatureDto } from "@modules/option-features/dto/create-option-feature.dto";
import { UpdateOptionFeatureDto } from "@modules/option-features/dto/update-option-feature.dto";

// Entities

import {
	OptionFeature,
	OptionFeatureDocument,
} from "@modules/option-features/entities/option-feature.entity";

// Services

import { AppService } from "@src/app.service";

@Injectable()
export class OptionFeaturesService extends AppService<
	OptionFeatureDocument,
	CreateOptionFeatureDto,
	UpdateOptionFeatureDto
> {
	private readonly logger = new Logger(OptionFeaturesService.name);

	constructor(
		@InjectModel(OptionFeature.name)
		private optionFeaturesModel: Model<OptionFeatureDocument>,
	) {
		super(optionFeaturesModel);
	}
}
