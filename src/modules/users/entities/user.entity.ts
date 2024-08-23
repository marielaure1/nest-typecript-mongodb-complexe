import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserStatusEnum } from "@enums/user-status.enum";
import { UserRoleEnum } from "@enums/user-role.enum";

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

	@Prop({
		type: [String],
		required: true,
		default: [UserStatusEnum.NOT_VERIFIED],
		enum: Object.values(UserStatusEnum),
	})
	status: UserStatusEnum[];

	@Prop({ type: Array, default: UserRoleEnum.CLIENT, enum: UserRoleEnum })
	role: UserRoleEnum;

	createdAt: Date;
	updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// const excludePassword = function () {
// 	this.select("-password");
// };

// UserSchema.pre("find", excludePassword);
// UserSchema.pre("findOne", excludePassword);
// UserSchema.pre("findOneAndUpdate", excludePassword);
