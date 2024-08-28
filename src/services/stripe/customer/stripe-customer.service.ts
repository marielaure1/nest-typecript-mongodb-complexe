import { Injectable, Inject } from "@nestjs/common";
import { Stripe } from "stripe";
import { StripeCustomerProps } from "@services/stripe/customer/stripe-customer.interface";

@Injectable()
export class StripeCustomerService {
	constructor(@Inject("STRIPE_CLIENT") private readonly stripe: Stripe) {}

	async create(stripeCustomerProps: StripeCustomerProps) {
		const { name, email } = stripeCustomerProps;

		return await this.stripe.customers.create({
			name,
			email,
		});
	}

	async retrieve(id: string) {
		return await this.stripe.customers.retrieve(id);
	}

	async update(id: string, stripeCustomerProps: StripeCustomerProps) {
		const { name, email } = stripeCustomerProps;

		return await this.stripe.customers.update(id, {
			name,
			email,
		});
	}

	async delete(id: string) {
		return await this.stripe.customers.del(id);
	}
}
