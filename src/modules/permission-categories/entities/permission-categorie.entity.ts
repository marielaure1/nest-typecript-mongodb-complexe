import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PermissionCategorieDocument = PermissionCategorie & Document;

@Schema({
	timestamps: true,
})
export class PermissionCategorie {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export const PermissionCategorieSchema =
	SchemaFactory.createForClass(PermissionCategorie);
