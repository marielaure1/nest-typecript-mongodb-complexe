import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateEmployeeDto } from "@modules/employees/dto/create-employee.dto";
import { UpdateEmployeeDto } from "@modules/employees/dto/update-employee.dto";
import {
	Employee,
	EmployeeDocument,
} from "@modules/employees/entities/employee.entity";
import { AppService } from "src/app.service";

@Injectable()
export class EmployeesService extends AppService<
	EmployeeDocument,
	CreateEmployeeDto,
	CreateEmployeeDto
> {
	constructor(
		@InjectModel(Employee.name)
		private employeesModel: Model<EmployeeDocument>,
	) {
		super(employeesModel);
	}
}
