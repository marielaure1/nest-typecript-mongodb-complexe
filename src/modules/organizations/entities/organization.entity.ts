import { OrganizationStatusEnum } from "@enums/companies/organization-status.enum";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OrganizationDocument = Organization & Document;

@Schema({
	timestamps: true,
})
export class Organization {
	@Prop({ required: true })
	name: string;

	@Prop({ default: null })
	description?: string;

	@Prop({ default: null })
	logo?: string;

	@Prop({ default: null })
	address1?: string;

	@Prop({ default: null })
	address2?: string;

	@Prop({ default: null })
	postalCode?: string;

	@Prop({ default: null })
	city?: string;

	@Prop({ default: null })
	country?: string;

	@Prop({ default: null })
	email?: string;

	@Prop({ default: null })
	phone?: string;

	@Prop({ default: null, unique: true })
	stripeCustomerId?: string;

	@Prop({ default: null, unique: true })
	stripeSubscriptionId?: string;

	@Prop({ default: null })
	stripeConnectId?: string;

	@Prop({ default: null, unique: true })
	taxId: string;

	@Prop({ default: null, unique: true })
	siren: string;

	@Prop({ required: true })
	ownerId: string;

	@Prop({ default: false })
	isVerified?: boolean;

	@Prop({
		default: OrganizationStatusEnum.PENDING,
		type: String,
		enum: OrganizationStatusEnum,
	})
	verificationStatus?: OrganizationStatusEnum;

	@Prop({ default: false })
	isActive?: boolean;

	createdAt?: Date;
	updatedAt?: Date;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
