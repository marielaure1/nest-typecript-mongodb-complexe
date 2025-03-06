import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ClientDocument = Client & Document;

@Schema({
	timestamps: true,
})
export class Client {
	@Prop({ required: true, unique: true })
	userId: string;

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

	@Prop({ required: false, unique: true, sparse: true })
	phone?: string;

	@Prop({ default: true })
	notificationEmail?: boolean;

	@Prop({ default: false })
	notificationSms?: boolean;

	// @Prop()
	// customFieldValues?: Array<object>;

	createdAt?: Date;
	updatedAt?: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
