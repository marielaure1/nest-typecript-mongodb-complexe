import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookerEmployeeDto {
	@ApiProperty({
		description: "The unique user ID of the employee",
		example: "user_12345",
	})
	@IsNotEmpty()
	@IsString()
	userId: string;

	@ApiProperty({
		description: "The last name of the employee",
		example: "Doe",
	})
	@IsNotEmpty()
	@IsString()
	lastName: string;

	@ApiProperty({
		description: "The first name of the employee",
		example: "John",
	})
	@IsNotEmpty()
	@IsString()
	firstName: string;
}
