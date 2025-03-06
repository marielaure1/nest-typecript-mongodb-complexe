// Base
import { Injectable, Inject, Logger } from "@nestjs/common";

// Depedencies
import { Stripe } from "stripe";

// Services
import { OptionsService } from "@modules/options/options.service";
import { PlanFeaturesService } from "@modules/plan-features/plan-features.service";
import { PlansService } from "@modules/plans/plans.service";

// Enums
import { ProductType } from "@enums/subscription/product-type.enum";

@Injectable()
export class StripeWebhookService {
	private readonly logger = new Logger(StripeWebhookService.name);

	constructor(
		@Inject("STRIPE_CLIENT") private readonly stripe: Stripe,
		private readonly plansService: PlansService,
		private readonly optionsService: OptionsService,
		private readonly planFeaturesService: PlanFeaturesService,
	) {}

	/**
	 *
	 * @param productCreated
	 */
	async eventProductCreated(productCreated: Stripe.Product) {
		try {
			const type = productCreated?.metadata?.type?.toLowerCase();

			if (type == ProductType.PLAN) {
				await this.plansService.create({
					createDto: {
						stripeProductId: productCreated.id,
						stripeProduct: productCreated,
					},
				});
			} else if (type == ProductType.OPTION) {
				await this.optionsService.create({
					createDto: {
						stripeProductId: productCreated.id,
						stripeProduct: productCreated,
					},
				});
			} else if (type == ProductType.PLAN_FEATURE) {
				await this.planFeaturesService.create({
					createDto: {
						stripeProductId: productCreated.id,
						stripeProduct: productCreated,
					},
				});
			} else {
				this.logger.error(
					`[ERROR] StripeWebhook => Product created: ${productCreated.id}`,
				);
			}

			this.logger.log(
				`[SUCCESS] StripeWebhook => Product created: ${productCreated.id}`,
			);
		} catch (error) {
			this.logger.error(
				`[ERROR] StripeWebhook => Product created: ${productCreated.id}`,
			);
		}
	}

	/**
	 *
	 * @param productUpdated
	 */
	async eventProductUpdated(productUpdated: Stripe.Product) {
		try {
			const type = productUpdated?.metadata?.type?.toLowerCase();

			if (type == ProductType.PLAN) {
				const plan = await this.plansService.findOne({
					filter: {
						stripeProductId: productUpdated.id.toString(),
					},
				});

				if (!plan) {
					await this.plansService.create({
						createDto: {
							stripeProductId: productUpdated.id,
							stripeProduct: productUpdated,
						},
					});
				} else {
					await this.plansService.update({
						id: plan._id.toString(),
						updateDto: {
							stripeProductId: productUpdated.id,
							stripeProduct: productUpdated,
						},
					});
				}
			} else if (type == ProductType.OPTION) {
				const option = await this.optionsService.findOne({
					filter: {
						stripeProductId: productUpdated.id.toString(),
					},
				});

				if (!option) {
					await this.optionsService.create({
						createDto: {
							stripeProductId: productUpdated.id,
							stripeProduct: productUpdated,
						},
					});
				} else {
					await this.optionsService.update({
						id: option._id.toString(),
						updateDto: {
							stripeProductId: productUpdated.id,
							stripeProduct: productUpdated,
						},
					});
				}
			} else if (type == ProductType.PLAN_FEATURE) {
				const planFeature = await this.planFeaturesService.findOne({
					filter: {
						stripeProductId: productUpdated.id.toString(),
					},
				});

				if (!planFeature) {
					await this.planFeaturesService.create({
						createDto: {
							stripeProductId: productUpdated.id,
							stripeProduct: productUpdated,
						},
					});
				} else {
					await this.planFeaturesService.update({
						id: planFeature._id.toString(),
						updateDto: {
							stripeProductId: productUpdated.id,
							stripeProduct: productUpdated,
						},
					});
				}
			} else {
				this.logger.error(
					`[ERROR] StripeWebhook => Product updated: ${productUpdated.id}`,
				);
			}

			this.logger.log(
				`[SUCCESS] StripeWebhook => Product updated: ${productUpdated.id}`,
			);
		} catch (error) {
			this.logger.error(
				`[ERROR] StripeWebhook => Product updated: ${productUpdated.id}`,
			);
		}
	}

	/**
	 *
	 * @param productDeleted
	 */
	async eventProductDeleted(productDeleted: Stripe.Product) {
		try {
			const type = productDeleted?.metadata?.type?.toLowerCase();

			if (type == ProductType.PLAN) {
				const plan = await this.plansService.findOne({
					filter: {
						stripeProductId: productDeleted.id.toString(),
					},
				});
				await this.plansService.remove({ id: plan._id.toString() });
			} else if (type == ProductType.OPTION) {
				const option = await this.optionsService.findOne({
					filter: {
						stripeProductId: productDeleted.id.toString(),
					},
				});
				await this.plansService.remove({ id: option._id.toString() });
			} else if (type == ProductType.PLAN_FEATURE) {
				const planFeature = await this.planFeaturesService.findOne({
					filter: {
						stripeProductId: productDeleted.id.toString(),
					},
				});
				await this.plansService.remove({
					id: planFeature._id.toString(),
				});
			} else {
				this.logger.error(
					`[ERROR] StripeWebhook => Product deleted: ${productDeleted.id}`,
				);
			}

			this.logger.log(
				`[SUCCESS] StripeWebhook => Product deleted: ${productDeleted.id}`,
			);
		} catch (error) {
			this.logger.error(
				`[ERROR] StripeWebhook => Product deleted: ${productDeleted.id}`,
			);
		}
	}

	/**
	 *
	 * @param planCreated
	 */
	async eventPlanCreated(planCreated: Stripe.Plan) {
		try {
			let productPlans = await this.stripe.plans.list({
				product: planCreated.product.toString(),
			});

			let product = await this.stripe.products.retrieve(
				planCreated.product.toString(),
			);

			const type = product?.metadata?.type?.toLowerCase();

			if (type == ProductType.PLAN) {
				const plan = await this.plansService.findOne({
					filter: {
						stripeProductId: product.id.toString(),
					},
				});

				await this.plansService.update({
					id: plan._id.toString(),
					updateDto: {
						stripePlans: productPlans.data,
					},
				});
			} else if (type == ProductType.OPTION) {
				const option = await this.optionsService.findOne({
					filter: {
						stripeProductId: product.id.toString(),
					},
				});

				await this.optionsService.update({
					id: option._id.toString(),
					updateDto: {
						stripePlans: productPlans.data,
					},
				});
			} else if (type == ProductType.PLAN_FEATURE) {
				const planFeature = await this.planFeaturesService.findOne({
					filter: {
						stripeProductId: product.id.toString(),
					},
				});

				await this.planFeaturesService.update({
					id: planFeature._id.toString(),
					updateDto: {
						stripePlans: productPlans.data,
					},
				});
			} else {
				this.logger.error(
					`[ERROR] StripeWebhook => Plan created: ${planCreated.id}`,
				);
			}

			this.logger.log(
				`[SUCCESS] StripeWebhook => Plan created: ${planCreated.id}`,
			);
		} catch (error) {
			this.logger.error(
				`[ERROR] StripeWebhook => Plan created: ${planCreated.id}`,
			);
		}
	}

	/**
	 *
	 * @param planUpdated
	 */
	async eventPlanUpdated(planUpdated: Stripe.Plan) {
		try {
			let productPlans = await this.stripe.plans.list({
				product: planUpdated.product.toString(),
			});

			let product = await this.stripe.products.retrieve(
				planUpdated.product.toString(),
			);
			const type = product?.metadata?.type?.toLowerCase();

			if (type == ProductType.PLAN) {
				const plan = await this.plansService.findOne({
					filter: {
						stripeProductId: product.id.toString(),
					},
				});

				await this.plansService.update({
					id: plan._id.toString(),
					updateDto: {
						stripePlans: productPlans.data,
					},
				});
			} else if (type == ProductType.OPTION) {
				const option = await this.optionsService.findOne({
					filter: {
						stripeProductId: product.id.toString(),
					},
				});

				await this.optionsService.update({
					id: option._id.toString(),
					updateDto: {
						stripePlans: productPlans.data,
					},
				});
			} else if (type == ProductType.PLAN_FEATURE) {
				const planFeature = await this.planFeaturesService.findOne({
					filter: {
						stripeProductId: product.id.toString(),
					},
				});

				await this.planFeaturesService.update({
					id: planFeature._id.toString(),
					updateDto: {
						stripePlans: productPlans.data,
					},
				});
			} else {
				this.logger.error(
					`[ERROR] StripeWebhook => Plan updated: ${planUpdated.id}`,
				);
			}

			this.logger.log(
				`[SUCCESS] StripeWebhook => Plan updated: ${planUpdated.id}`,
			);
		} catch (error) {
			this.logger.error(
				`[ERROR] StripeWebhook => Plan updated: ${planUpdated.id}`,
			);
		}
	}

	/**
	 *
	 * @param planDeleted
	 */
	async eventPlanDeleted(planDeleted: Stripe.Plan) {
		try {
			let productPlans = await this.stripe.plans.list({
				product: planDeleted.product.toString(),
			});

			let product = await this.stripe.products.retrieve(
				planDeleted.product.toString(),
			);
			const type = product?.metadata?.type?.toLowerCase();

			if (type == ProductType.PLAN) {
				const plan = await this.plansService.findOne({
					filter: {
						stripeProductId: product.id.toString(),
					},
				});

				await this.plansService.update({
					id: plan._id.toString(),
					updateDto: {
						stripePlans: productPlans.data,
					},
				});
			} else if (type == ProductType.OPTION) {
				const option = await this.optionsService.findOne({
					filter: {
						stripeProductId: product.id.toString(),
					},
				});

				await this.optionsService.update({
					id: option._id.toString(),
					updateDto: {
						stripePlans: productPlans.data,
					},
				});
			} else if (type == ProductType.PLAN_FEATURE) {
				const planFeature = await this.planFeaturesService.findOne({
					filter: {
						stripeProductId: product.id.toString(),
					},
				});

				await this.planFeaturesService.update({
					id: planFeature._id.toString(),
					updateDto: {
						stripePlans: productPlans.data,
					},
				});
			} else {
				this.logger.error(
					`[ERROR] StripeWebhook => Plan deleted: ${planDeleted.id}`,
				);
			}

			this.logger.log(
				`[SUCCESS] StripeWebhook => Plan deleted: ${planDeleted.id}`,
			);
		} catch (error) {
			this.logger.error(
				`[ERROR] StripeWebhook => Plan deleted: ${planDeleted.id}`,
			);
		}
	}
}
