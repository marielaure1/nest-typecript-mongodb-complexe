import { IsString, IsNotEmpty } from "class-validator";

export class FlagDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	color: string;
}
