import { PartialType } from "@nestjs/swagger";
import { CreatePlanOptionFeatureDto } from "@modules/plan-option-features/dto/create-plan-option-feature.dto";

export class UpdatePlanOptionFeatureDto extends PartialType(
	CreatePlanOptionFeatureDto,
) {}
