// Base
import { Injectable, Logger } from "@nestjs/common";

// Dependencies
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Dtos
import { CreateUserRoleDto } from "@modules/user-roles/dto/create-user-role.dto";
import { UpdateUserRoleDto } from "@modules/user-roles/dto/update-user-role.dto";

// Entities

import {
	UserRole,
	UserRoleDocument,
} from "@modules/user-roles/entities/user-role.entity";

// Services

import { AppService } from "@src/app.service";

@Injectable()
export class UserRolesService extends AppService<
	UserRoleDocument,
	CreateUserRoleDto,
	UpdateUserRoleDto
> {
	private readonly logger = new Logger(UserRolesService.name);

	constructor(
		@InjectModel(UserRole.name)
		private UserRolesModel: Model<UserRoleDocument>,
	) {
		super(UserRolesModel);
	}
}
