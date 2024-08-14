import { CustomFieldValueDto } from "@dtos/custom-field-value.dto";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
	@IsOptional()
	@IsString()
	userId?: string;

	@ApiProperty({ description: "The first name of the client" })
	@IsNotEmpty()
	@IsString()
	firstName: string;

	@ApiProperty({ description: "The last name of the client" })
	@IsNotEmpty()
	@IsString()
	lastName: string;

	@ApiProperty({ description: "The address1 of the client" })
	@IsOptional()
	@IsString()
	address1?: string;

	@ApiProperty({ description: "The address2 of the client" })
	@IsOptional()
	@IsString()
	address2?: string;

	@ApiProperty({ description: "The postal code of the client" })
	@IsOptional()
	@IsString()
	postalCode?: string;

	@ApiProperty({ description: "The city of the client" })
	@IsOptional()
	@IsString()
	city?: string;

	@ApiProperty({ description: "The country of the client" })
	@IsOptional()
	@IsString()
	country?: string;

	@ApiProperty({ description: "The client want email notifications" })
	@IsNotEmpty()
	@IsBoolean()
	notificationEmail: boolean;

	@ApiProperty({ description: "The client want sms notifications" })
	@IsNotEmpty()
	@IsBoolean()
	notificationSms: boolean;

	// @ApiProperty({ description: "The company ID of the Company" })
	// @IsString()
	// @IsNotEmpty()
	// companyId: string;

	// @ApiPropertyOptional({
	// 	description: "The custom field values of the client",
	// 	type: CustomFieldValueDto,
	// })
	// @IsOptional()
	// @IsObject()
	// @ValidateNested({ each: true })
	// @Type(() => CustomFieldValueDto)
	// customFieldValues?: CustomFieldValueDto;
}
