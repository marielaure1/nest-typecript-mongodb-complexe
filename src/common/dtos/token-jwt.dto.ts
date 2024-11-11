import { IsNotEmpty, IsString } from "class-validator";

export class TokenJwtDto {
	@IsString()
	@IsNotEmpty()
	token: string;
}
