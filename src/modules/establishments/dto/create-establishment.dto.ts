import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEstablishmentDto {
	@ApiProperty({
		description: "The name of the establishment",
		example: "Main Street Barber Shop",
	})
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({
		description: "The description of the establishment",
		example: "A cozy barber shop located in the heart of the city.",
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({
		description: "The website of the establishment",
		example: "https://mainstreetbarbers.com",
	})
	@IsOptional()
	@IsString()
	website?: string;

	@ApiProperty({
		description: "The phone number of the establishment",
		example: "+1234567890",
	})
	@IsOptional()
	@IsString()
	phone?: string;

	@ApiProperty({
		description: "The first address of the establishment",
		example: "456 Main Street",
	})
	@IsOptional()
	@IsString()
	address1?: string;

	@ApiProperty({
		description: "The second address of the establishment",
		example: "Floor 2",
	})
	@IsOptional()
	@IsString()
	address2?: string;

	@ApiProperty({
		description: "The postal code of the establishment",
		example: "67890",
	})
	@IsOptional()
	@IsString()
	postalCode?: string;

	@ApiProperty({
		description: "The city of the establishment",
		example: "Barberville",
	})
	@IsOptional()
	@IsString()
	city?: string;

	@ApiProperty({
		description: "The country of the establishment",
		example: "USA",
	})
	@IsOptional()
	@IsString()
	country?: string;

	@ApiProperty({
		description: "The logo of the establishment",
		example: "https://example.com/establishment-logo.png",
	})
	@IsOptional()
	@IsString()
	logo?: string;

	@ApiProperty({
		description: "The organization ID associated with the establishment",
		example: "organization_001",
	})
	@IsNotEmpty()
	@IsString()
	organizationId: string;
}
