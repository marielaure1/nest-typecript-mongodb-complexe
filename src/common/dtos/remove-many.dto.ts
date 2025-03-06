import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class RemoveManyDto {
	@IsNotEmpty()
	@IsArray()
	@ArrayNotEmpty()
	@IsString({ each: true })
	ids: string[];
}
