import { IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateClientDto {
	@IsOptional()
	@IsString()
	@ApiPropertyOptional({
		description: "The user ID associated with the client",
		example: "12345abcde",
	})
	userId?: string;

	@ApiProperty({
		description: "The first name of the client",
		example: "John",
	})
	@IsNotEmpty()
	@IsString()
	firstName: string;

	@ApiProperty({
		description: "The last name of the client",
		example: "Doe",
	})
	@IsNotEmpty()
	@IsString()
	lastName: string;

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

	@ApiProperty({
		description: "The client wants email notifications",
		example: true,
	})
	@IsNotEmpty()
	@IsBoolean()
	notificationEmail: boolean;

	@ApiProperty({
		description: "The client wants SMS notifications",
		example: true,
	})
	@IsNotEmpty()
	@IsBoolean()
	notificationSms: boolean;
}
