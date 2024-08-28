import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlanDto {
	@ApiProperty({
		description: "The name of the plan",
		example: "Premium Plan",
	})
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({
		description: "The description of the plan",
		example: "Access to all premium features with priority support.",
	})
	@IsNotEmpty()
	@IsString()
	description: string;

	@ApiProperty({
		description: "The amount to be charged for the plan",
		example: 999,
	})
	@IsNotEmpty()
	@IsNumber()
	amount: number;

	@ApiProperty({
		description: "The currency in which the plan is charged",
		example: "USD",
	})
	@IsNotEmpty()
	@IsString()
	currency: string;

	@ApiProperty({
		description: "The billing interval for the plan (e.g., month, year)",
		example: "month",
	})
	@IsNotEmpty()
	@IsString()
	interval: string;

	@ApiProperty({
		description: "The number of intervals between each billing",
		example: 1,
	})
	@IsNotEmpty()
	@IsNumber()
	intervalCount: number;

	@ApiProperty({
		description:
			"The number of trial period days before the plan starts billing",
		example: 14,
	})
	@IsNotEmpty()
	@IsNumber()
	trialPeriodDays: number;

	@ApiProperty({
		description: "Indicates if the plan is currently active",
		example: true,
	})
	@IsNotEmpty()
	@IsBoolean()
	active: boolean;

	@ApiProperty({
		description: "Indicates if the plan is in live mode or test mode",
		example: true,
	})
	@IsNotEmpty()
	@IsBoolean()
	livemode: boolean;
}
