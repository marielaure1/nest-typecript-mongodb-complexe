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
import { regex } from "@constants/regex";
import { UserStatusEnum } from "@enums/user-status.enum";
import { UserTypeEnum } from "@enums/user-type.enum";

export class CreateUserDto {
	@ApiPropertyOptional({
		description: "The email of the user",
		example: "user@example.com",
	})
	@IsOptional()
	@Matches(regex.email)
	email?: string;

	@ApiPropertyOptional({
		description: "The password of the user",
		example: "Password123!",
	})
	@IsOptional()
	@Matches(regex.password)
	password?: string;

	@IsOptional()
	@IsEnum(UserTypeEnum)
	userType?: UserTypeEnum;

	@IsOptional()
	@IsBoolean()
	isActive?: boolean;

	@ApiPropertyOptional({
		description: "Indicates whether the user is verified",
		example: false,
	})
	@IsOptional()
	@IsBoolean()
	isVerified?: boolean;

	@IsOptional()
	@IsString()
	lastConnection?: Date;

	@IsOptional()
	@IsEnum(UserStatusEnum)
	status?: UserStatusEnum;

	@IsOptional()
	@IsString()
	googleId?: string;

	@IsString()
	@IsOptional()
	googleAccessToken?: string;

	@IsString()
	@IsOptional()
	firstName?: string;

	@IsString()
	@IsOptional()
	lastName?: string;
}
