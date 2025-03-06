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

export class CreateRolePermissionDto {
	@ApiProperty({
		description: "Role ID",
		example: "60d7b3d5e6f3f1d7f8a8b3a1",
	})
	@IsNotEmpty()
	@IsString()
	roleId: string;

	@ApiProperty({
		description: "Permission ID",
		example: "60d7b3d5e6f3f1d7f8a8b3a1",
	})
	@IsNotEmpty()
	@IsString()
	permissionId: string;

	@ApiPropertyOptional({
		description: "Establishment ID",
		example: "60d7b3d5e6f3f1d7f8a8b3a1",
	})
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	establishmentId?: string;

	@ApiPropertyOptional({
		description: "Is Staff",
		example: true,
	})
	@IsOptional()
	@IsBoolean()
	isStaff?: boolean;
}
