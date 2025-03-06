import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StaffDocument = Staff & Document;

@Schema({
	timestamps: true,
})
export class Staff {
	@Prop({ required: true, unique: true })
	userId: string;

	@Prop({ required: true })
	lastName: string;

	@Prop({ required: true })
	firstName: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
