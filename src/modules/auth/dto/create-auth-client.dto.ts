import { Document } from "mongoose";
import { IntersectionType } from "@nestjs/swagger";
import { CreateUserDto } from "@modules/users/dto/create-user.dto";
import { CreateClientDto } from "@modules/clients/dto/create-client.dto";

export class CreateAuthClientDto extends IntersectionType(
	Document,
	CreateUserDto,
	CreateClientDto,
) {}
