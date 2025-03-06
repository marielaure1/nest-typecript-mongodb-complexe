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

export class CreateUserPermissionDto {
	@ApiProperty({
		description: "User ID",
		example: "60f6d0b7c3e1a0001f000001",
	})
	@IsNotEmpty()
	@IsString()
	userId: string;

	@ApiProperty({
		description: "Permission ID",
		example: "60f6d0b7c3e1a0001f000001",
	})
	@IsNotEmpty()
	@IsString()
	permissionId: string;

	@ApiPropertyOptional({
		description: "Establishment ID",
		example: "60f6d0b7c3e1a0001f000001",
	})
	@IsOptional()
	@IsString()
	establishmentId?: string;

	@ApiPropertyOptional({
		description: "Is Staff",
		example: false,
	})
	@IsOptional()
	@IsBoolean()
	isStaff?: boolean;

	@ApiProperty({
		description: "Granted",
		example: true,
	})
	@IsBoolean()
	@IsNotEmpty()
	granted: boolean;
}
