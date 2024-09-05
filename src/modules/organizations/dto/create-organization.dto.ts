import { IsNotEmpty, IsString, IsOptional, IsEmpty } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateOrganizationDto {
	@ApiProperty({
		description: "The name of the organization",
		example: "Tech Innovators Inc.",
	})
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiPropertyOptional({
		description: "The description of the organization",
		example: "A leading company in technology innovations.",
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional({
		description: "The logo of the organization",
		example: "https://example.com/logo.png",
	})
	@IsOptional()
	@IsString()
	logo?: string;

	@ApiPropertyOptional({
		description: "The first address of the organization",
		example: "123 Innovation Street",
	})
	@IsOptional()
	@IsString()
	address1?: string;

	@ApiPropertyOptional({
		description: "The second address of the organization",
		example: "Suite 100",
	})
	@IsOptional()
	@IsString()
	address2?: string;

	@ApiPropertyOptional({
		description: "The postal code of the organization",
		example: "12345",
	})
	@IsOptional()
	@IsString()
	postalCode?: string;

	@ApiPropertyOptional({
		description: "The city of the organization",
		example: "Techville",
	})
	@IsOptional()
	@IsString()
	city?: string;

	@ApiPropertyOptional({
		description: "The country of the organization",
		example: "USA",
	})
	@IsOptional()
	@IsString()
	country?: string;

	@IsOptional()
	@IsString()
	stripePlanId?: string;

	@IsOptional()
	@IsString()
	managerId?: string;
}
