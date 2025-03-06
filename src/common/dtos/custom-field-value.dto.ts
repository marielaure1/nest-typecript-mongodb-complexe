import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CustomFieldValueDto {
	@IsString()
	@IsNotEmpty()
	customFieldId: string;

	@IsOptional()
	value?: any;
}
