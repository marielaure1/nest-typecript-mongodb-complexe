import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
	@IsNumber()
	@IsNotEmpty()
	amount: number;

	@IsString()
	@IsNotEmpty()
	currency: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	paymentMethodId: string;

	@IsString()
	@IsNotEmpty()
	customerId: string;

	@IsString()
	@IsNotEmpty()
	paymentIntentId: string;
}
