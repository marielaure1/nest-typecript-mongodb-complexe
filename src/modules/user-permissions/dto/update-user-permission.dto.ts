import { PartialType } from "@nestjs/swagger";
import { CreateUserPermissionDto } from "@modules/user-permissions/dto/create-user-permission.dto";

export class UpdateUserPermissionDto extends PartialType(
	CreateUserPermissionDto,
) {}
