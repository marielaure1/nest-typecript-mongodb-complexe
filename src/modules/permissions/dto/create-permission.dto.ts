import {
	IsNotEmpty,
	IsOptional
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePermissionDto {
	@ApiProperty()
	@IsNotEmpty()
	title: string;

	@ApiProperty()
	@IsNotEmpty()
	description: string;

	@ApiProperty()
	@IsNotEmpty()
	category: string;

	@ApiProperty()
	@IsNotEmpty()
	code: string;

	@ApiPropertyOptional()
	@IsOptional()
	client: string;

	@ApiPropertyOptional()
	@IsOptional()
	organization: string;

	@ApiPropertyOptional()
	@IsOptional()
	booker: string;
}
