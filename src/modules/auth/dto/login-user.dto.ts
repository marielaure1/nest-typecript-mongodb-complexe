import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
	@ApiProperty({
		description: "The email of the user",
		example: "user@example.com",
	})
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		description: "The password of the user",
		example: "Password123!",
	})
	@IsNotEmpty()
	password: string;
}
