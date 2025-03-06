// Base
import { Injectable, Logger } from "@nestjs/common";

// Dependencies
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Dtos
import { CreatePermissionDto } from "@modules/permissions/dto/create-permission.dto";
import { UpdatePermissionDto } from "@modules/permissions/dto/update-permission.dto";

// Entities
import {
	Permission,
	PermissionDocument,
} from "@modules/permissions/entities/permission.entity";

// Services
import { AppService } from "@src/app.service";

@Injectable()
export class PermissionsService extends AppService<
	PermissionDocument,
	CreatePermissionDto,
	UpdatePermissionDto
> {
	private readonly logger = new Logger(PermissionsService.name);

	constructor(
		@InjectModel(Permission.name)
		private permissionsModel: Model<PermissionDocument>,
	) {
		super(permissionsModel);
		console.log("PermissionsService initialized");
	}
}
