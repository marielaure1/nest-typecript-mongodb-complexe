import {
	IsNotEmpty,
	IsString,
	IsBoolean,
	IsOptional,
	Matches,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { regex } from "@constants/regex";

export class CreateEmployeeDto {
	@ApiProperty({
		description: "The unique user ID of the employee",
		example: "user_12345",
	})
	@IsOptional()
	@IsString()
	userId: string;

	@ApiPropertyOptional({
		description: "The phone number of the user",
		example: "+1234567890",
	})
	@IsOptional()
	@Matches(regex.phone)
	phone?: string;

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
