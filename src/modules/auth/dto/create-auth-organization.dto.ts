import { CreateUserDto } from "@modules/users/dto/create-user.dto";
import { CreateOrganizationDto } from "@modules/organizations/dto/create-organization.dto";
import { CreateEmployeeDto } from "@modules/employees/dto/create-employee.dto";
import { IntersectionType } from "@nestjs/swagger";
import { Document } from "mongoose";

export class CreateAuthOrganizationDto extends IntersectionType(
	Document,
	CreateOrganizationDto,
	CreateUserDto,
	CreateEmployeeDto,
) {}
