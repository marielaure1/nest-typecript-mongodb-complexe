import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrganizationDto {
	@ApiProperty({
		description: "The name of the organization",
		example: "Tech Innovators Inc.",
	})
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({
		description: "The description of the organization",
		example: "A leading company in technology innovations.",
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({
		description: "The logo of the organization",
		example: "https://example.com/logo.png",
	})
	@IsOptional()
	@IsString()
	logo?: string;

	@ApiProperty({
		description: "The first address of the organization",
		example: "123 Innovation Street",
	})
	@IsOptional()
	@IsString()
	address1?: string;

	@ApiProperty({
		description: "The second address of the organization",
		example: "Suite 100",
	})
	@IsOptional()
	@IsString()
	address2?: string;

	@ApiProperty({
		description: "The postal code of the organization",
		example: "12345",
	})
	@IsOptional()
	@IsString()
	postalCode?: string;

	@ApiProperty({
		description: "The city of the organization",
		example: "Techville",
	})
	@IsOptional()
	@IsString()
	city?: string;

	@ApiProperty({
		description: "The country of the organization",
		example: "USA",
	})
	@IsOptional()
	@IsString()
	country?: string;

	@ApiProperty({
		description: "The Stripe plan ID associated with the organization",
		example: "plan_123abc",
	})
	@IsOptional()
	@IsString()
	stripePlanId?: string;

	@ApiProperty({
		description: "The manager ID of the organization",
		example: "manager_001",
	})
	@IsNotEmpty()
	@IsString()
	managerId: string;
}
