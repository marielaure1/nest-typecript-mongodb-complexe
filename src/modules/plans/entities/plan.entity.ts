import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import type { Stripe } from "stripe";

export type PlanDocument = Plan & Document;

@Schema({
	timestamps: true,
})
export class Plan {
	@Prop({ required: true, unique: true })
	stripeProductId: string;

	@Prop({ type: Object, required: true })
	stripeProduct: Stripe.Product;

	@Prop({ required: true })
	stripePlans?: Array<Stripe.Plan>;

	@Prop({ default: false })
	active: boolean;

	@Prop({ default: false })
	mostPopular?: boolean;

	@Prop({ default: 1 })
	design?: number;

	@Prop({ default: false })
	btnContactUs?: boolean;

	createdAt?: Date;
	updatedAt?: Date;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
