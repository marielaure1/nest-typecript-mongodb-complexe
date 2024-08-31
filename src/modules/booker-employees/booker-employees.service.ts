import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateBookerEmployeeDto } from "@modules/booker-employees/dto/create-booker-employee.dto";
import { UpdateBookerEmployeeDto } from "@modules/booker-employees/dto/update-booker-employee.dto";
import {
	BookerEmployee,
	BookerEmployeeDocument,
} from "@modules/booker-employees/entities/booker-employee.entity";
import { AppService } from "@src/app.service";

@Injectable()
export class BookerEmployeesService extends AppService<
	BookerEmployeeDocument,
	CreateBookerEmployeeDto,
	UpdateBookerEmployeeDto
> {
	constructor(
		@InjectModel(BookerEmployee.name)
		private bookerEmployeesModel: Model<BookerEmployeeDocument>,
	) {
		super(bookerEmployeesModel);
	}
}
