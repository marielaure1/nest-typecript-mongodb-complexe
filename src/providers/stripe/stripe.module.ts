// Base
import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// Dependencies
import { Stripe } from "stripe";

// Service
import { StripeWebhookService } from "@providers/stripe/stripe-webhook.service";
import { PlansService } from "@modules/plans/plans.service";
import { OptionsService } from "@modules/options/options.service";
import { FeaturesService } from "@modules/features/features.service";
import { PlanFeaturesService } from "@modules/plan-features/plan-features.service";

// Controller
import { StripeWebhookController } from "@providers/stripe/stripe-webhook.controller";

@Global()
@Module({
	imports: [],
	controllers: [StripeWebhookController],
	providers: [
		{
			provide: "STRIPE_CLIENT",
			useFactory: (configService: ConfigService) => {
				return new Stripe(
					configService.get<string>("STRIPE_SECRET_KEY"),
					{
						apiVersion: "2025-01-27.acacia",
					},
				);
			},
			inject: [ConfigService],
		},
		StripeWebhookService,
		PlansService,
		OptionsService,
		PlanFeaturesService,
		FeaturesService,
	],
	exports: ["STRIPE_CLIENT"],
})
export class StripeModule {}
