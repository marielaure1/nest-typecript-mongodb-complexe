import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserRoleDocument = UserRole & Document;

@Schema({
	timestamps: true,
})
export class UserRole {
	@Prop({ required: true })
	userId: string;

	@Prop({ required: true })
	roleId: string;

	@Prop({ default: null })
	establishmentId?: string;

	@Prop({ default: false })
	isStaff?: boolean;

	createdAt?: Date;
	updatedAt?: Date;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
