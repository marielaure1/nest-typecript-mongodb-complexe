import {
	IsNotEmpty,
	IsOptional
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePermissionCategorieDto {
	@ApiProperty()
	@IsNotEmpty()
	title: string;

	@ApiProperty()
	@IsNotEmpty()
	description: string;
}
