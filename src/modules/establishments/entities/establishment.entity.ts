import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type EstablishmentDocument = Establishment & Document;

@Schema({
	timestamps: true,
})
export class Establishment {
	@Prop({ required: true })
	name: string;

	@Prop()
	description?: string;

	@Prop()
	website?: string;

	@Prop()
	phone?: string;

	@Prop({ default: null })
	address1?: string;

	@Prop({ default: null })
	address2?: string;

	@Prop()
	postalCode?: string;

	@Prop({ default: null })
	city?: string;

	@Prop({ default: null })
	country?: string;

	@Prop()
	logo?: string;

	@Prop({ required: true })
	organizationId: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export const EstablishmentSchema = SchemaFactory.createForClass(Establishment);
