import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
	@ApiProperty({ description: "The email of the user" })
	@IsNotEmpty()
	email: string;

	@ApiProperty({ description: "The password of the user" })
	@IsNotEmpty()
	password: string;
}
