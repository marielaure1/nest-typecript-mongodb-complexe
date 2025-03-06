import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PlanOptionFeatureDocument = PlanOptionFeature & Document;

@Schema({
	timestamps: true,
})
export class PlanOptionFeature {
	@Prop({ required: true })
	planId: string;

	@Prop({ required: true })
	optionId: string;

	@Prop()
	featureId?: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export const PlanOptionFeatureSchema =
	SchemaFactory.createForClass(PlanOptionFeature);
