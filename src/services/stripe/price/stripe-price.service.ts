import { Injectable, Inject } from "@nestjs/common";
import { Stripe } from "stripe";
import { StripePriceProps } from "@services/stripe/price/stripe-price.interface";

@Injectable()
export class StripePriceService {
	constructor(@Inject("STRIPE_CLIENT") private readonly stripe: Stripe) {}

	async create(stripePriceProps: StripePriceProps) {
		const { currency, amount, interval, intervalCount, trialPeriodDays, livemode, active } = stripePriceProps;

		return await this.stripe.prices.create({
			currency,
			livemode,
			unit_amount: amount,
			active,
			recurring: {
				interval,
				interval_count: intervalCount,
				trial_period_days: trialPeriodDays,
			},
		});
	}

	async retrieve(id: string) {
		return await this.stripe.products.retrieve(id);
	}

	async update(id: string, stripePriceProps: StripePriceProps) {
		const { currency, amount, interval } = stripePriceProps;

		return await this.stripe.prices.update(id, {
			currency,
			unit_amount: amount,
			recurring: {
				interval,
			},
		});
	}

	async delete(id: string) {
		return await this.stripe.products.del(id);
	}
}
