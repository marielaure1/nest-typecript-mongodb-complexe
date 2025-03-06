import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RolePermissionDocument = RolePermission & Document;

@Schema({
	timestamps: true,
})
export class RolePermission {
	@Prop({ required: true })
	roleId: string;

	@Prop({ required: true })
	permissionId: string;

	@Prop({ default: null })
	establishmentId?: string;

	@Prop({ default: false })
	isStaff: boolean;

	createdAt?: Date;
	updatedAt?: Date;
}

export const RolePermissionSchema =
	SchemaFactory.createForClass(RolePermission);

RolePermissionSchema.index(
	{ roleId: 1, permissionId: 1, establishmentId: 1 },
	{ unique: true },
);

RolePermissionSchema.index(
	{ roleId: 1, permissionId: 1 },
	{ unique: true, partialFilterExpression: { establishmentId: null } },
);
