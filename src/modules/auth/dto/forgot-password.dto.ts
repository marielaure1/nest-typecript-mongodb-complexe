import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";
import { regex } from "@constants/regex";

export class ForgotPasswordDto {
	@ApiProperty({
		description: "The email of the user",
		example: "user@example.com",
	})
	@IsNotEmpty()
	@Matches(regex.email)
	email: string;
}
