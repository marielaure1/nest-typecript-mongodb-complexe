import { PartialType } from "@nestjs/swagger";
import { CreateRolePermissionDto } from "@modules/role-permissions/dto/create-role-permission.dto";

export class UpdateRolePermissionDto extends PartialType(
	CreateRolePermissionDto,
) {}
