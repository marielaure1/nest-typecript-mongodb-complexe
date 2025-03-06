import { Document } from "mongoose";
import { IntersectionType } from "@nestjs/swagger";
import { CreateUserDto } from "@modules/users/dto/create-user.dto";

export class CreateAuthClientDto extends IntersectionType(
	Document,
	CreateUserDto,
) {}
