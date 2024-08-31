import { CreateUserDto } from "@modules/users/dto/create-user.dto";
import { CreateOrganizationDto } from "@modules/organizations/dto/create-organization.dto";
import { Type } from "class-transformer";
import { CreateBookerEmployeeDto } from "@modules/booker-employees/dto/create-booker-employee.dto";

export class CreateAuthOrganizationDto {
	@Type(() => CreateOrganizationDto)
	organization: CreateOrganizationDto;

	@Type(() => CreateUserDto)
	user: CreateUserDto;

	@Type(() => CreateBookerEmployeeDto)
	bookerEmployee: CreateBookerEmployeeDto;
}
