import { IsNotEmpty, IsString, Matches } from "class-validator";
import Regex from "@constants/regex";

export class ResetPasswordDto {
	@IsNotEmpty()
	@IsString()
	readonly token: string;

	@IsNotEmpty()
	@IsString()
	@Matches(Regex.password)
	readonly newPassword: string;
}
