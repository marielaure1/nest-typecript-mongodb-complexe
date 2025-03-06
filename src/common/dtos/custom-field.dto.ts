import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CustomFieldDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	type: string;

	@IsOptional()
	value?: any;

	@IsString()
	@IsOptional()
	position?: number;
}
