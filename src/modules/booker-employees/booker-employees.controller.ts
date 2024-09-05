import { log } from "console";
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
import { FastifyReply } from "fastify";

import { Connection } from "mongoose";
import { LogsService } from "@modules/logs/logs.service";

@ApiTags("booker-employees")
@Controller("booker-employees")
export class BookerEmployeesController extends AppController<
	BookerEmployeeDocument,
	CreateBookerEmployeeDto,
	UpdateBookerEmployeeDto
> {
	constructor(
		private readonly bookerEmployeesService: BookerEmployeesService,
		connection: Connection,
		logsService: LogsService,
	) {
		super(
			bookerEmployeesService,
			"bookerEmployees",
			connection,
		);
	}
}
