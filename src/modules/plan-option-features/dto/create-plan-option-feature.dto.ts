import {
	IsBoolean,
	IsEmpty,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	Matches,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePlanOptionFeatureDto {
	@IsString()
	planId: string;

	@IsString()
	optionId: string;

	@IsOptional()
	@IsString()
	featureId?: string;
}
