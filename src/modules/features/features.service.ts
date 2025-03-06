// Base
import { Injectable, Logger } from "@nestjs/common";

// Dependencies
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Dtos
import { CreateFeatureDto } from "@modules/features/dto/create-feature.dto";
import { UpdateFeatureDto } from "@modules/features/dto/update-feature.dto";

// Entities
import {
	Feature,
	FeatureDocument,
} from "@modules/features/entities/feature.entity";

// Services
import { AppService } from "@src/app.service";

@Injectable()
export class FeaturesService extends AppService<
	FeatureDocument,
	CreateFeatureDto,
	UpdateFeatureDto
> {
	private readonly logger = new Logger(FeaturesService.name);

	constructor(
		@InjectModel(Feature.name)
		private featuresModel: Model<FeatureDocument>,
	) {
		super(featuresModel);
	}
}
