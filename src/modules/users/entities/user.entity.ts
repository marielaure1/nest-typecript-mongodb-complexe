import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import UserStatusEnum from "@enums/user-status.enum";
import UserRoleEnum from "@enums/user-role.enum";

export type UserDocument = User & Document;

@Schema({
	timestamps: true,
})
export class User {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({
		required: true,
		default: UserStatusEnum.NOT_VERIFIED,
		enum: UserStatusEnum,
	})
	status: UserStatusEnum;

	@Prop({ default: UserRoleEnum.CLIENT, enum: UserRoleEnum })
	role: UserRoleEnum;

	createdAt?: Date;
	updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("find", function () {
	this.select("-password");
});
