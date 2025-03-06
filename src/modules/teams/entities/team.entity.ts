import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TeamDocument = Team & Document;

@Schema({
	timestamps: true,
})
export class Team {
	@Prop({ required: true })
	userId: string;

	@Prop({ required: true })
	establishmentId: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

TeamSchema.index({ userId: 1, establishmentId: 1 }, { unique: true });
