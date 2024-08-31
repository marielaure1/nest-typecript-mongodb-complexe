import {
	IsAlpha,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	Matches,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import Regex from "@constants/regex";
import { UserStatusEnum } from "@enums/user-status.enum";
import { UserRoleEnum } from "@enums/user-role.enum";

export class CreateUserDto {
	@ApiProperty({ description: "The email of the user" })
	@IsNotEmpty()
	@Matches(Regex.email)
	email: string;

	@ApiProperty({ description: "The phone number of the user" })
	@IsOptional()
	@Matches(Regex.phone)
	phone?: string;

	@ApiProperty({ description: "The password of the user" })
	@IsNotEmpty()
	@Matches(Regex.password)
	password: string;

	@ApiPropertyOptional({
		description: "The status of the user",
		enum: UserStatusEnum,
	})
	@IsOptional()
	@IsAlpha()
	status?: UserStatusEnum[];

	@ApiPropertyOptional({
		description: "The role of the user",
		enum: UserRoleEnum,
	})
	@IsOptional()
	@IsEnum(UserRoleEnum)
	role?: UserRoleEnum;
}
