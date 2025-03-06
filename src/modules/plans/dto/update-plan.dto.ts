import {
	IsNotEmpty,
	IsString,
	IsNumber,
	IsBoolean,
	IsObject,
	IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePlanDto {
	@IsOptional()
	@IsBoolean()
	active?: object;

	@IsOptional()
	@IsBoolean()
	mostPopular?: boolean;

	@IsOptional()
	@IsNumber()
	design?: number;

	@IsOptional()
	@IsBoolean()
	btnContactUs?: boolean;
}
