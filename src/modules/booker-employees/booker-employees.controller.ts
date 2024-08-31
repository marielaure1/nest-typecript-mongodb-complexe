import { Controller } from "@nestjs/common";
import { BookerEmployeesService } from "@modules/booker-employees/booker-employees.service";
import { CreateBookerEmployeeDto } from "@modules/booker-employees/dto/create-booker-employee.dto";
import { UpdateBookerEmployeeDto } from "@modules/booker-employees/dto/update-booker-employee.dto";
import { BookerEmployeeDocument } from "@modules/booker-employees/entities/booker-employee.entity";
import { AppController } from "@src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { Response } from "express";
import { LogHelper } from "@modules/logs/helpers/log.helper";
import { Connection } from "mongoose";

@ApiTags("booker-employees")
@Controller("booker-employees")
export class BookerEmployeesController extends AppController<
	BookerEmployeeDocument,
	CreateBookerEmployeeDto,
	UpdateBookerEmployeeDto
> {
	constructor(
		private readonly bookerEmployeesService: BookerEmployeesService,
		logHelper: LogHelper,
		connection: Connection,
	) {
		super(bookerEmployeesService, "bookerEmployees", connection, logHelper);
	}
}
