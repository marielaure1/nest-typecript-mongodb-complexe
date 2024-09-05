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
import Regex from "@constants/regex";
import { UserStatusEnum } from "@enums/user-status.enum";
import { UserRoleEnum } from "@enums/user-role.enum";

export class CreateUserDto {
	@ApiProperty({
		description: "The email of the user",
		example: "user@example.com",
	})
	@IsNotEmpty()
	@Matches(Regex.email)
	email: string;

	@ApiProperty({
		description: "The phone number of the user",
		example: "+1234567890",
	})
	@IsOptional()
	@Matches(Regex.phone)
	phone?: string;

	@ApiProperty({
		description: "The password of the user",
		example: "Password123!",
	})
	@IsNotEmpty()
	@Matches(Regex.password)
	password: string;

	@ApiPropertyOptional({
		description: "The role of the user",
		enum: UserRoleEnum,
		example: UserRoleEnum.CLIENT,
	})
	@IsOptional()
	@IsEnum(UserRoleEnum)
	role?: UserRoleEnum;

	@ApiProperty({
		description: "Indicates whether the user is active",
		example: true,
	})
	@IsOptional()
	@IsBoolean()
	isActive?: boolean;

	@ApiProperty({
		description: "Indicates whether the user is verified",
		example: false,
	})
	@IsOptional()
	@IsBoolean()
	isVerified?: boolean;

	@ApiPropertyOptional({
		description: "The last connection date of the user",
		example: "2024-01-01T00:00:00.000Z",
	})
	@IsOptional()
	@IsString()
	lastConnection?: Date;

	@ApiPropertyOptional({
		description: "The status of the user",
		enum: UserStatusEnum,
		example: UserStatusEnum.AVAILABLE,
	})
	@IsOptional()
	@IsEnum(UserStatusEnum)
	status?: UserStatusEnum;
}
