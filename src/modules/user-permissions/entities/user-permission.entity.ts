import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserPermissionDocument = UserPermission & Document;

@Schema({
	timestamps: true,
})
export class UserPermission {
	@Prop({ required: true })
	userId: string;

	@Prop({ required: true })
	permissionId: string;

	@Prop({ default: null })
	establishmentId?: string;

	@Prop({ default: false })
	isStaff?: boolean;

	@Prop({ default: false })
	granted: boolean;

	createdAt?: Date;
	updatedAt?: Date;
}

export const UserPermissionSchema =
	SchemaFactory.createForClass(UserPermission);
