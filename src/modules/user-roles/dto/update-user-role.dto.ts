import { PartialType } from "@nestjs/swagger";
import { CreateUserRoleDto } from "@modules/user-roles/dto/create-user-role.dto";

export class UpdateUserRoleDto extends PartialType(CreateUserRoleDto) {}
