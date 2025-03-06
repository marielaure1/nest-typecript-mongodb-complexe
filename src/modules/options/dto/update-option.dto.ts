import {
	IsNotEmpty,
	IsString,
	IsNumber,
	IsBoolean,
	IsObject,
	IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOptionDto {
	@IsOptional()
	@IsBoolean()
	active?: object;
}
