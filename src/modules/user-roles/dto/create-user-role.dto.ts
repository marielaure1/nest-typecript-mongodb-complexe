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

export class CreateUserRoleDto {
	@ApiProperty({
		description: "User ID",
		example: "60d0fe4f9b7e6c001f6f3b6d",
	})
	@IsNotEmpty()
	@IsString()
	userId: string;

	@ApiProperty({
		description: "Role ID",
		example: "60d0fe4f9b7e6c001f6f3b6d",
	})
	@IsNotEmpty()
	@IsString()
	roleId: string;

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
