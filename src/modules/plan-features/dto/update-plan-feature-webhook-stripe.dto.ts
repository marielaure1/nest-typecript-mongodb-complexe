import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
} from "class-validator";
import { Stripe } from "stripe";

export class UpdatePlanFeatureWebhookStripeDto {
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
}
