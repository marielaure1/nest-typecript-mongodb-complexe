import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserStatusEnum } from "@enums/user-status.enum";
import { UserTypeEnum } from "@enums/user-type.enum";

export type UserDocument = User & Document;

@Schema({
	timestamps: true,
})
export class User {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: false })
	lastName?: string;

	@Prop({ required: false })
	firstName?: string;

	@Prop({ required: false, select: false })
	password?: string;

	@Prop({ type: Array, default: UserTypeEnum.CLIENT, enum: UserTypeEnum })
	userType: UserTypeEnum;

	@Prop({ required: false, default: true })
	isActive?: boolean;

	@Prop({ required: false, default: false })
	isVerified?: boolean;

	@Prop()
	lastConnection?: Date;

	@Prop({
		type: String,
		enum: UserStatusEnum,
		default: UserStatusEnum.AVAILABLE,
	})
	status?: UserStatusEnum;

	@Prop()
	googleId?: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
