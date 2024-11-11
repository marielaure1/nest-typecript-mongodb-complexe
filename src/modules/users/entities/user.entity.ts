import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRoleEnum } from "@enums/user-role.enum";
import { UserStatusEnum } from "@enums/user-status.enum";

export type UserDocument = User & Document;

@Schema({
	timestamps: true,
})
export class User {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: false, unique: true, sparse: true })
	phone?: string;

	@Prop({ required: true, select: false })
	password: string;

	@Prop({ type: Array, default: UserRoleEnum.CLIENT, enum: UserRoleEnum })
	role: UserRoleEnum;

	@Prop({ required: true, default: true })
	isActive: boolean;

	@Prop({ required: true, default: false })
	isVerified: boolean;

	@Prop()
	lastConnection?: Date;

	@Prop({
		type: String,
		enum: UserStatusEnum,
		default: UserStatusEnum.AVAILABLE,
	})
	status: UserStatusEnum;

	createdAt: Date;
	updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
