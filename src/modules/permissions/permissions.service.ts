import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePermissionDto } from "@modules/permissions/dto/create-permission.dto";
import { UpdatePermissionDto } from "@modules/permissions/dto/update-permission.dto";
import {
	Permission,
	PermissionDocument,
} from "@modules/permissions/entities/permission.entity";
import { AppService } from "@src/app.service";

@Injectable()
export class PermissionsService extends AppService<
	PermissionDocument,
	CreatePermissionDto,
	UpdatePermissionDto
> {
	constructor(
		@InjectModel(Permission.name)
		private permissionsModel: Model<PermissionDocument>,
	) {
		super(permissionsModel);
	}
}
