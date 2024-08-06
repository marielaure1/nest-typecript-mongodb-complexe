import {
	IsString,
	IsNotEmpty,
	IsOptional,
	IsObject,
	IsArray,
	ValidateNested,
	IsDate,
	IsNumber,
} from "class-validator";
import { Type } from "class-transformer";

export class CustomFieldDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	type: string;

	@IsOptional()
	value?: any;

	@IsString()
	@IsOptional()
	position?: number;
}
