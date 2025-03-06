// Base
import { Injectable, Logger } from "@nestjs/common";

// Dependencies
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Dtos
import { CreateRolePermissionDto } from "@modules/role-permissions/dto/create-role-permission.dto";
import { UpdateRolePermissionDto } from "@modules/role-permissions/dto/update-role-permission.dto";

// Entities

import {
	RolePermission,
	RolePermissionDocument,
} from "@modules/role-permissions/entities/role-permission.entity";

// Services

import { AppService } from "@src/app.service";

@Injectable()
export class RolePermissionsService extends AppService<
	RolePermissionDocument,
	CreateRolePermissionDto,
	UpdateRolePermissionDto
> {
	private readonly logger = new Logger(RolePermissionsService.name);

	constructor(
		@InjectModel(RolePermission.name)
		private rolePermissionsModel: Model<RolePermissionDocument>,
	) {
		super(rolePermissionsModel);
	}
}
