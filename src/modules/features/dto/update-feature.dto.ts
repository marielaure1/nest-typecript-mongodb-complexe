import { PartialType } from "@nestjs/swagger";
import { CreateFeatureDto } from "@modules/features/dto/create-feature.dto";

export class UpdateFeatureDto extends PartialType(CreateFeatureDto) {}
