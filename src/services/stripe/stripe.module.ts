import { Global, Module } from "@nestjs/common";
import { StripePlanService } from "@services/stripe/plan/stripe-plan.service";
import { ConfigService } from "@nestjs/config";
import { Stripe } from "stripe";
import { settings } from "@constants/settings";

@Global()
@Module({
	imports: [],
	controllers: [],
	providers: [
		{
			provide: "STRIPE_CLIENT",
			useFactory: (configService: ConfigService) => {
				return new Stripe(
					configService.get<string>(settings.STRIPE_PUBLIC_KEY),
					{
						apiVersion: "2024-06-20",
					},
				);
			},
			inject: [ConfigService],
		},
		StripePlanService,
	],
	exports: ["STRIPE_CLIENT"],
})
export class StripeModule {}
