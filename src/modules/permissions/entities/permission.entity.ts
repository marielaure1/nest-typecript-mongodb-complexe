import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { PermissionCategoriesEnum } from "@enums/users/permission-categories.enum";

export type PermissionDocument = Permission & Document;

@Schema({
	timestamps: true,
})
export class Permission {
	@Prop({ required: true })
	name: string;

	@Prop({ default: null })
	description?: string;

	@Prop({ required: true, unique: true })
	code: string;

	@Prop({ required: true, type: String, enum: PermissionCategoriesEnum })
	category: PermissionCategoriesEnum;

	createdAt?: Date;
	updatedAt?: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
