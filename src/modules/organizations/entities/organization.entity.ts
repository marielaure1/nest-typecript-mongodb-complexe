import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OrganizationDocument = Organization & Document;

@Schema({
	timestamps: true,
})
export class Organization {
	@Prop({ required: true })
	name: string;

	@Prop()
	description?: string;

	@Prop()
	logo?: string;

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
	stripePlanId?: string;

	@Prop({ required: true })
	managerId: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
