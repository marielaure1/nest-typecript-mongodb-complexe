import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type RefreshTokenDocument = RefreshToken & Document;

@Schema({
	timestamps: true,
})
export class RefreshToken {
	@Prop()
	userId: string;

	@Prop({ unique: true })
	token: string;

	@Prop()
	expiresAt: Date;

	@Prop({ default: false })
	isRevoked: boolean;

	createdAt: Date;
	updatedAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
