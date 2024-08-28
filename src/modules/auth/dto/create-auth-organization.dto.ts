import { Document } from "mongoose";
import { IntersectionType } from "@nestjs/swagger";
import { CreateUserDto } from "@modules/users/dto/create-user.dto";
import { CreateOrganizationDto } from "@modules/organizations/dto/create-organization.dto";

export class CreateAuthClientDto extends IntersectionType(
	Document,
	CreateUserDto,
	CreateOrganizationDto,
) {}
