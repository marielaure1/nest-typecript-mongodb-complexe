import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
} from "class-validator";
import { Stripe } from "stripe";

export class UpdatePlanWebhookStripeDto {
	@IsOptional()
	@IsString()
	stripeProductId?: string;

	@IsOptional()
	@IsObject()
	stripeProduct?: Stripe.Product;

	@IsOptional()
	@IsArray()
	stripePlans?: Array<Stripe.Plan>;

	@IsOptional()
	@IsBoolean()
	active?: boolean;

	@IsOptional()
	@IsBoolean()
	mostPopular?: boolean;

	@IsOptional()
	@IsNumber()
	design?: number;

	@IsOptional()
	@IsBoolean()
	btnContactUs?: boolean;
}
