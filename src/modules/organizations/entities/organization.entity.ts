import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OrganizationDocument = Organization & Document;

@Schema({
	timestamps: true,
})
export class Organization {
	// PROPERTIES

	createdAt?: Date;
	updatedAt?: Date;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
