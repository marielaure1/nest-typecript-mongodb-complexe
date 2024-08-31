import { Injectable, Inject } from "@nestjs/common";
import { Stripe } from "stripe";
import { StripeProductProps } from "@src/providers/stripe/product/stripe-product.interface";

@Injectable()
export class StripeProductService {
	constructor(@Inject("STRIPE_CLIENT") private readonly stripe: Stripe) {}

	async create(stripeProductProps: StripeProductProps) {
		const { name } = stripeProductProps;
		return await this.stripe.products.create({
			name,
		});
	}

	async retrieve(id: string) {
		return await this.stripe.products.retrieve(id);
	}

	async update(id: string, stripeProductProps: StripeProductProps) {
		const { name } = stripeProductProps;

		return await this.stripe.products.update(id, {
			name,
		});
	}

	async delete(id: string) {
		return await this.stripe.products.del(id);
	}
}
