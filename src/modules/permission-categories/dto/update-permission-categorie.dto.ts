import { PartialType } from "@nestjs/swagger";
import { CreatePermissionCategorieDto } from "@modules/permission-categories/dto/create-permission-categorie.dto";

export class UpdatePermissionCategorieDto extends PartialType(CreatePermissionCategorieDto) {}
