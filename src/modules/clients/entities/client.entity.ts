import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ClientDocument = Client & Document;

@Schema({
	timestamps: true,
})
export class Client {
	@Prop()
	society?: string;

	@Prop({ required: true })
	lastName: string;

	@Prop({ required: true })
	firstName: string;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	phone: string;

	@Prop({ required: true })
	address: string;

	@Prop({ required: true })
	status: string;

	@Prop()
	lastContactDate?: Date;

	@Prop()
	marketSegment?: string;

	@Prop()
	needs?: string;

	@Prop()
	leadSource?: string;

	@Prop()
	companySize?: string;

	@Prop()
	estimatedBudget?: number;

	@Prop({ required: true })
	ownerId: string;

	@Prop()
	customFieldValues?: Array<object>;

	createdAt?: Date;
	updatedAt?: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
