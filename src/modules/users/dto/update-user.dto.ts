import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "@modules/users/dto/create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {}
