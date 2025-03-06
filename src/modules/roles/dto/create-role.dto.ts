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

export class CreateRoleDto {
	@ApiProperty({
		description: "Name of the role",
		example: "Admin",
	})
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiPropertyOptional({
		description: "Description of the role",
		example: "Admin role",
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional({
		description: "Establishment ID",
		example: "60d0fe4f9b7e6c001f6f3b6d",
	})
	@IsOptional()
	@IsString()
	establishmentId?: string;

	@ApiPropertyOptional({
		description: "Is staff role",
		example: false,
	})
	@IsOptional()
	@IsBoolean()
	isStaff?: boolean;
}
