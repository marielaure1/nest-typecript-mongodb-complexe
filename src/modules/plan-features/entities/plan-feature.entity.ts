import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Stripe } from "stripe";

export type PlanFeatureDocument = PlanFeature & Document;

@Schema({
	timestamps: true,
})
export class PlanFeature {
	@Prop({ required: true, unique: true })
	stripeProductId: string;

	@Prop({ type: Object, required: true })
	stripeProduct: Stripe.Product;

	@Prop({ required: true })
	stripePlans?: Array<Stripe.Plan>;

	@Prop({ default: false })
	active: boolean;

	createdAt?: Date;
	updatedAt?: Date;
}

export const PlanFeatureSchema = SchemaFactory.createForClass(PlanFeature);
