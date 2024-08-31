import { CurrencyEnum } from "@enums/currency.enum";
import Stripe from "stripe";
// import { IntervalType } from "@types/interval.type";

export class StripePriceProps {
	name: string;
	currency: CurrencyEnum;
	amount: number;
	interval: Stripe.Price.Recurring.Interval;
	intervalCount: number;
	trialPeriodDays: number;
	active: boolean;
}
