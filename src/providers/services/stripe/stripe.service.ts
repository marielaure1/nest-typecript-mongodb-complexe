import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { ConfigService } from "@nestjs/config";

@Injectable()
export abstract class StripeService {
	private stripe: Stripe;

	constructor(private readonly configService: ConfigService) {
		const stripeApiKey = this.configService.get<string>("STRIPE_API_KEY");
		this.stripe = new Stripe(stripeApiKey, {});
	}

	protected getStripeInstance(): Stripe {
		return this.stripe;
	}
}
