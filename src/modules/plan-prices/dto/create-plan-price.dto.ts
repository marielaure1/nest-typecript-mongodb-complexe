import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
	IsString,
	IsNumber,
	IsEnum,
	IsBoolean,
	IsOptional,
	MinLength,
	MaxLength,
	Min,
} from "class-validator";
import { CurrencyEnum } from "@enums/currency.enum";
import { IntervalEnum } from "@enums/interval.enum";

export class CreatePlanPriceDto {
	@ApiProperty({
		description: "Name of the plan price",
		example: "Basic Plan",
		minLength: 3,
		maxLength: 50,
		required: true,
	})
	@IsString()
	@MinLength(3)
	@MaxLength(50)
	name: string;

	@ApiProperty({
		description:
			"Amount to be charged for the plan price (in the smallest currency unit)",
		example: 1000,
		minimum: 0,
		required: true,
	})
	@IsNumber()
	@Min(0)
	amount: number;

	@ApiProperty({
		description: "Currency for the plan price",
		example: "usd",
		enum: CurrencyEnum,
		required: true,
	})
	@IsEnum(CurrencyEnum)
	currency: string;

	@ApiProperty({
		description: "Billing interval for the plan price",
		example: "month",
		enum: IntervalEnum,
		required: true,
	})
	@IsEnum(IntervalEnum)
	interval: string;

	@ApiProperty({
		description: "The number of intervals between each billing cycle",
		example: 1,
		required: true,
	})
	@IsNumber()
	intervalCount: number;

	@ApiProperty({
		description: "Number of trial period days offered with the plan",
		example: 14,
		required: true,
	})
	@IsNumber()
	trialPeriodDays: number;

	@ApiProperty({
		description: "Indicates whether the plan price is active",
		example: true,
		default: true,
		required: true,
	})
	@IsBoolean()
	active: boolean;

	@ApiPropertyOptional({
		description: "Date when the plan price was created",
		example: "2023-08-30T12:00:00Z",
		format: "date-time",
	})
	@IsOptional()
	createdAt?: Date;

	@ApiPropertyOptional({
		description: "Date when the plan price was last updated",
		example: "2023-08-30T12:00:00Z",
		format: "date-time",
	})
	@IsOptional()
	updatedAt?: Date;
}
