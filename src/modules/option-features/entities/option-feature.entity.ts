import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OptionFeatureDocument = OptionFeature & Document;

@Schema({
	timestamps: true,
})
export class OptionFeature {
	@Prop({ required: true })
	optionId: string;

	@Prop()
	featureId?: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export const OptionFeatureSchema = SchemaFactory.createForClass(OptionFeature);
