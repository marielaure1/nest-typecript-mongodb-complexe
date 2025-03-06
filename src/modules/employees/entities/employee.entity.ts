import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type EmployeeDocument = Employee & Document;

@Schema({
	timestamps: true,
})
export class Employee {
	@Prop({ required: true, unique: true })
	userId: string;

	@Prop({ required: false, unique: true, sparse: true })
	phone?: string;

	@Prop({ default: true })
	notificationEmail?: boolean;

	@Prop({ default: false })
	notificationSms?: boolean;

	createdAt?: Date;
	updatedAt?: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
