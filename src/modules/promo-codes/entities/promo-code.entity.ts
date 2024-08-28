import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PromoCodeDocument = PromoCode & Document;

@Schema({
	timestamps: true,
})
export class PromoCode {
	// PROPERTIES

	createdAt?: Date;
	updatedAt?: Date;
}

export const PromoCodeSchema = SchemaFactory.createForClass(PromoCode);
