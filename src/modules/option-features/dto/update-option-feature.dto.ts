import { PartialType } from "@nestjs/swagger";
import { CreateOptionFeatureDto } from "@modules/option-features/dto/create-option-feature.dto";

export class UpdateOptionFeatureDto extends PartialType(
	CreateOptionFeatureDto,
) {}
