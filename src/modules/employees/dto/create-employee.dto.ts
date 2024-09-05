import { IsNotEmpty, IsString, IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeDto {
	@ApiProperty({
		description: "The unique user ID of the employee",
		example: "user_12345",
	})
	@IsOptional()
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

	@ApiProperty({
		description: "Indicates if the employee wants email notifications",
		example: true,
	})
	@IsOptional()
	@IsBoolean()
	notificationEmail?: boolean;

	@ApiProperty({
		description: "Indicates if the employee wants SMS notifications",
		example: false,
	})
	@IsOptional()
	@IsBoolean()
	notificationSms?: boolean;
}
