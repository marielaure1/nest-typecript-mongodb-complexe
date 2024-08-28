import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type EmployeeDocument = Employee & Document;

@Schema({
	timestamps: true,
})
export class Employee {
	@Prop({ required: true, unique: true })
	userId: string;

	@Prop({ required: true })
	lastName: string;

	@Prop({ required: true })
	firstName: string;

	@Prop()
	notificationEmail: boolean;

	@Prop()
	notificationSms: boolean;

	createdAt?: Date;
	updatedAt?: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
