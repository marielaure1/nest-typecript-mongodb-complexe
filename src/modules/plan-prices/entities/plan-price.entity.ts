import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PlanPriceDocument = PlanPrice & Document;

@Schema({
	timestamps: true,
})
export class PlanPrice {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	amount: number;

	@Prop({ required: true })
	currency: string;

	@Prop({ required: true })
	interval: string;

	@Prop({ required: true })
	intervalCount: number;

	@Prop({ required: true })
	trialPeriodDays: number;

	@Prop({ required: true })
	active: boolean;

	createdAt?: Date;
	updatedAt?: Date;
}

export const PlanPriceSchema = SchemaFactory.createForClass(PlanPrice);
