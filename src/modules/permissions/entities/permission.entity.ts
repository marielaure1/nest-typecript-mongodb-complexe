import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PermissionDocument = Permission & Document;

@Schema({
	timestamps: true,
})
export class Permission {
	@Prop({ required: true })
	permissionCategorieId: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	code: string;

	@Prop({ required: true, default: false })
	client: string;

	@Prop({ required: true, default: false })
	organization: string;

	@Prop({ required: true, default: false })
	booker: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
