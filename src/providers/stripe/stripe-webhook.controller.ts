import { StripeWebhookService } from "@providers/stripe/stripe-webhook.service";
import { PlansService } from "./../../modules/plans/plans.service";
import { configService } from "@constants/env";
import {
	Controller,
	Post,
	Req,
	Res,
	HttpStatus,
	Logger,
	Inject,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { Stripe } from "stripe";

interface RequestWithRawBody extends Request {
	rawBody: Buffer;
}

@Controller("webhook/stripe")
export class StripeWebhookController {
	private readonly logger = new Logger(StripeWebhookController.name);

	constructor(
		@Inject("STRIPE_CLIENT") private readonly stripe: Stripe,
		private readonly plansService: PlansService,
		private readonly stripeWebhookService: StripeWebhookService,
	) {}

	@Post()
	async handleWebhook(@Req() req: Request, @Res() res: Response) {
		const sig = req.headers["stripe-signature"];
		const endpointSecret = configService.get<string>(
			"STRIPE_WEBHOOK_SECRET_KEY",
		);

		let event: Stripe.Event;

		try {
			event = this.stripe.webhooks.constructEvent(
				(req as RequestWithRawBody).rawBody,
				sig,
				endpointSecret,
			);
		} catch (err) {
			const errorMessage = (err as Error).message;
			this.logger.error(
				`⚠️ Webhook signature verification failed: ${errorMessage}`,
			);
			return res
				.status(HttpStatus.BAD_REQUEST)
				.send(`Webhook Error: ${errorMessage}`);
		}

		this.logger.log(`🔔 Webhook Stripe reçu: ${event.type}`);

		let subscription;
		let status;
		switch (event.type) {
			case "customer.subscription.trial_will_end":
				subscription = event.data.object;
				status = subscription.status;
				console.log(`Subscription status is ${status}.`);
				// Then define and call a method to handle the subscription trial ending.
				// handleSubscriptionTrialEnding(subscription);
				break;
			case "customer.subscription.deleted":
				subscription = event.data.object;
				status = subscription.status;
				console.log(`Subscription status is ${status}.`);
				// Then define and call a method to handle the subscription deleted.
				// handleSubscriptionDeleted(subscriptionDeleted);
				break;
			case "customer.subscription.created":
				subscription = event.data.object;
				status = subscription.status;
				console.log(`Subscription status is ${status}.`);
				// Then define and call a method to handle the subscription created.
				// handleSubscriptionCreated(subscription);
				break;
			case "customer.subscription.updated":
				subscription = event.data.object;
				status = subscription.status;
				console.log(`Subscription status is ${status}.`);
				// Then define and call a method to handle the subscription update.
				// handleSubscriptionUpdated(subscription);
				break;
			case "entitlements.active_entitlement_summary.updated":
				subscription = event.data.object;
				console.log(
					`Active entitlement summary updated for ${subscription}.`,
				);
				// Then define and call a method to handle active entitlement summary updated
				// handleEntitlementUpdated(subscription);
				break;
			case "payment_intent.succeeded":
				const paymentIntent = event.data.object as Stripe.PaymentIntent;
				break;
			case "invoice.payment_failed":
				const invoice = event.data.object as Stripe.Invoice;
				break;
			case "plan.created":
				await this.stripeWebhookService.eventPlanCreated(
					event.data.object as Stripe.Plan,
				);
				break;
			case "plan.updated":
				await this.stripeWebhookService.eventPlanUpdated(
					event.data.object as Stripe.Plan,
				);
				break;
			case "plan.deleted":
				await this.stripeWebhookService.eventPlanDeleted(
					event.data.object as Stripe.Plan,
				);
				break;
			case "product.created":
				await this.stripeWebhookService.eventProductCreated(
					event.data.object as Stripe.Product,
				);
				break;
			case "product.updated":
				await this.stripeWebhookService.eventProductUpdated(
					event.data.object as Stripe.Product,
				);
				break;
			case "product.deleted":
				await this.stripeWebhookService.eventProductDeleted(
					event.data.object as Stripe.Product,
				);
				break;
			default:
				this.logger.warn(`⚠️ Unhandled event type : ${event.type}`);
		}

		res.status(HttpStatus.OK).send({ received: true });
	}
}
