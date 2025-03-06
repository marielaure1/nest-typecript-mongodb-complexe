// Base
import { Injectable, Logger } from "@nestjs/common";

// Dependencies
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Dtos
import { CreateRoleDto } from "@modules/roles/dto/create-role.dto";
import { UpdateRoleDto } from "@modules/roles/dto/update-role.dto";

// Entities

import { Role, RoleDocument } from "@modules/roles/entities/role.entity";

// Services

import { AppService } from "@src/app.service";

@Injectable()
export class RolesService extends AppService<
	RoleDocument,
	CreateRoleDto,
	UpdateRoleDto
> {
	private readonly logger = new Logger(RolesService.name);

	constructor(
		@InjectModel(Role.name) private rolesModel: Model<RoleDocument>,
	) {
		super(rolesModel);
	}
}
