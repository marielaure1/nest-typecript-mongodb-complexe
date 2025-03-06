import { IsObject, IsString } from "class-validator";
import { Stripe } from "stripe";

export class CreateProductWebhookStripeDto {
	@IsString()
	stripeProductId: string;

	@IsObject()
	stripeProduct: Stripe.Product;
}
