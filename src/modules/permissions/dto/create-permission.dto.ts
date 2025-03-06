import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PermissionCategoriesEnum } from "@enums/users/permission-categories.enum";

export class CreatePermissionDto {
	@ApiProperty({
		description: "The name of the permission",
		example: "Create User",
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiPropertyOptional({
		description: "The description of the permission",
		example: "Allows the user to create a new user",
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({
		description: "The code of the permission",
		example: "create-user",
	})
	@IsString()
	@IsNotEmpty()
	code: string;

	@ApiProperty({
		description: "The category of the permission",
		example: "users",
		enum: PermissionCategoriesEnum,
	})
	@IsEnum(PermissionCategoriesEnum)
	@IsNotEmpty()
	category: PermissionCategoriesEnum;
}
