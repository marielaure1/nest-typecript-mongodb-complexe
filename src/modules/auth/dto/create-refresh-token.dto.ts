import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateRefreshTokenDto {
	@IsNotEmpty()
	@IsString()
	userId: string;

	@IsNotEmpty()
	@IsString()
	token: string;

	@IsNotEmpty()
	@IsDate()
	expiresAt: Date;

	@IsNotEmpty()
	@IsBoolean()
	isRevoked: boolean;
}
