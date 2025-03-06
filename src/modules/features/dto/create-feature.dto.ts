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
import { FeatureTypenum } from "@enums/subscription/feature-type.enum";

export class CreateFeatureDto {
	@IsOptional()
	@IsString()
	planFeatureId?: string;

	@IsOptional()
	@IsEmpty()
	lookupKey?: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsNotEmpty()
	@IsEnum(FeatureTypenum)
	type: FeatureTypenum;

	@IsOptional()
	@IsBoolean()
	active?: boolean;
}
