// Base
import { Injectable, Logger } from "@nestjs/common";

// Dependencies
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Dtos
import { CreateUserPermissionDto } from "@modules/user-permissions/dto/create-user-permission.dto";
import { UpdateUserPermissionDto } from "@modules/user-permissions/dto/update-user-permission.dto";

// Entities

import {
	UserPermission,
	UserPermissionDocument,
} from "@modules/user-permissions/entities/user-permission.entity";

// Services

import { AppService } from "@src/app.service";

@Injectable()
export class UserPermissionsService extends AppService<
	UserPermissionDocument,
	CreateUserPermissionDto,
	UpdateUserPermissionDto
> {
	private readonly logger = new Logger(UserPermissionsService.name);

	constructor(
		@InjectModel(UserPermission.name)
		private userPermissionsModel: Model<UserPermissionDocument>,
	) {
		super(userPermissionsModel);
	}
}
