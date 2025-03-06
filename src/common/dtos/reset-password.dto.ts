import { IsNotEmpty, Matches } from "class-validator";
import { regex } from "@constants/regex";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
	@ApiProperty({
		description: "The password of the user",
		example: "Password123!",
	})
	@IsNotEmpty()
	@Matches(regex.password)
	newPassword?: string;
}
