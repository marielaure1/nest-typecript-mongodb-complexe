import { PartialType } from "@nestjs/swagger";
import {
	IsNotEmpty,
	IsString,
	IsNumber,
	IsBoolean,
	IsObject,
	IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePlanFeatureDto {
	@IsOptional()
	@IsBoolean()
	active?: object;
}
