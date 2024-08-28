import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SubscriptionDocument = Subscription & Document;

@Schema({
	timestamps: true,
})
export class Subscription {
	// PROPERTIES

	createdAt?: Date;
	updatedAt?: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
