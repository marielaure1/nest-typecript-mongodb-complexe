import { Controller } from "@nestjs/common";
import { EmployeesService } from "@modules/employees/employees.service";
import { CreateEmployeeDto } from "@modules/employees/dto/create-employee.dto";
import { UpdateEmployeeDto } from "@modules/employees/dto/update-employee.dto";
import { EmployeeDocument } from "@modules/employees/entities/employee.entity";
import { AppController } from "src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("employees")
@Controller("employees")
export class EmployeesController extends AppController<
	EmployeeDocument,
	CreateEmployeeDto,
	UpdateEmployeeDto
> {
	constructor(private readonly employeesService: EmployeesService) {
		super(employeesService, "employees");
	}
}
