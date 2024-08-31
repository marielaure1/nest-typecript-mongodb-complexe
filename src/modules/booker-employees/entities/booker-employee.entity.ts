import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BookerEmployeeDocument = BookerEmployee & Document;

@Schema({
	timestamps: true,
})
export class BookerEmployee {
	@Prop({ required: true, unique: true })
	userId: string;

	@Prop({ required: true })
	lastName: string;

	@Prop({ required: true })
	firstName: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export const BookerEmployeeSchema =
	SchemaFactory.createForClass(BookerEmployee);
