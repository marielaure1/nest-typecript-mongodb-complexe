import { FeatureTypenum } from "@enums/subscription/feature-type.enum";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Stripe } from "stripe";

export type FeatureDocument = Feature & Document;

@Schema({
	timestamps: true,
})
export class Feature {
	@Prop({ unique: true })
	planFeatureId?: string;

	@Prop({ required: true })
	name: string;

	@Prop({ default: null })
	description?: string;

	@Prop({ default: null })
	lookupKey?: string;

	@Prop({ required: true, type: String, enum: FeatureTypenum })
	type: FeatureTypenum;

	@Prop({ default: false })
	active?: boolean;

	createdAt?: Date;
	updatedAt?: Date;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
