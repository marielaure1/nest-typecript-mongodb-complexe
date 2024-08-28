import { CurrencyEnum } from "@enums/currency.enum";
import { IntervalEnum } from "@enums/interval.enum";

export class StripePriceProps {
	currency: CurrencyEnum;
	amount: number;
	interval: IntervalEnum;
}
