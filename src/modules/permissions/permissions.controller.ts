import { Controller } from "@nestjs/common";
import { PermissionsService } from "@modules/permissions/permissions.service";
import { CreatePermissionDto } from "@modules/permissions/dto/create-permission.dto";
import { UpdatePermissionDto } from "@modules/permissions/dto/update-permission.dto";
import { PermissionDocument } from "@modules/permissions/entities/permission.entity";
import { AppController } from "@src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { FastifyRequest, FastifyReply } from "fastify";
import { Connection } from "mongoose";

@ApiTags("permissions")
@Controller("permissions")
export class PermissionsController extends AppController<
	PermissionDocument,
	CreatePermissionDto,
	UpdatePermissionDto
> {
	constructor(
		private readonly permissionsService: PermissionsService,
		connection: Connection,
	) {
		super(permissionsService, "permissions", connection);
	}
}
