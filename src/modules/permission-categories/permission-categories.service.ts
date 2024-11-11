import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePermissionCategorieDto } from "@modules/permission-categories/dto/create-permission-categorie.dto";
import { UpdatePermissionCategorieDto } from "@modules/permission-categories/dto/update-permission-categorie.dto";
import {
	PermissionCategorie,
	PermissionCategorieDocument,
} from "@modules/permission-categories/entities/permission-categorie.entity";
import { AppService } from "@src/app.service";

@Injectable()
export class PermissionCategoriesService extends AppService<
	PermissionCategorieDocument,
	CreatePermissionCategorieDto,
	UpdatePermissionCategorieDto
> {
	constructor(
		@InjectModel(PermissionCategorie.name)
		private permissionCategoriesModel: Model<PermissionCategorieDocument>,
	) {
		super(permissionCategoriesModel);
	}
}
