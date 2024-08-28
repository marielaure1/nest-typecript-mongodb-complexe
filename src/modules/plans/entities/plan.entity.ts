import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PlanDocument = Plan & Document;

@Schema({
	timestamps: true,
})
export class Plan {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	active: boolean;

	@Prop({ required: true })
	stripeProductId: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
