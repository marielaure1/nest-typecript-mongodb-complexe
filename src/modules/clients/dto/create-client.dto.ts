import {
	IsNotEmpty,
	IsString,
	IsOptional,
	IsBoolean,
	Matches,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { regex } from "@constants/regex";

export class CreateClientDto {
	@ApiPropertyOptional({
		description: "The user ID associated with the client",
		example: "12345abcde",
	})
	@IsOptional()
	@IsString()
	userId?: string;

	@ApiPropertyOptional({
		description: "The address1 of the client",
		example: "123 Main St",
	})
	@IsOptional()
	@IsString()
	address1?: string;

	@ApiPropertyOptional({
		description: "The address2 of the client",
		example: "Apt 4B",
	})
	@IsOptional()
	@IsString()
	address2?: string;

	@ApiPropertyOptional({
		description: "The postal code of the client",
		example: "12345",
	})
	@IsOptional()
	@IsString()
	postalCode?: string;

	@ApiPropertyOptional({
		description: "The city of the client",
		example: "New York",
	})
	@IsOptional()
	@IsString()
	city?: string;

	@ApiPropertyOptional({
		description: "The country of the client",
		example: "USA",
	})
	@IsOptional()
	@IsString()
	country?: string;

	@ApiPropertyOptional({
		description: "The phone number of the user",
		example: "+1234567890",
	})
	@IsOptional()
	@Matches(regex.phone)
	phone?: string;

	@ApiProperty({
		description: "The client wants email notifications",
		example: true,
	})
	@IsOptional()
	@IsBoolean()
	notificationEmail?: boolean;

	@ApiProperty({
		description: "The client wants SMS notifications",
		example: true,
	})
	@IsOptional()
	@IsBoolean()
	notificationSms?: boolean;
}
