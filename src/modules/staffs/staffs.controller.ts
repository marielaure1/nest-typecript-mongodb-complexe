import { Controller } from "@nestjs/common";
import { StaffsService } from "@modules/staffs/staffs.service";
import { CreateStaffDto } from "@modules/staffs/dto/create-staff.dto";
import { UpdateStaffDto } from "@modules/staffs/dto/update-staff.dto";
import { StaffDocument } from "@modules/staffs/entities/staff.entity";
import { AppController } from "@src/app.controller";
import { ApiTags } from "@nestjs/swagger";

import { Connection } from "mongoose";
import { LogsService } from "@modules/logs/logs.service";

@ApiTags("staffs")
@Controller("staffs")
export class StaffsController extends AppController<
	StaffDocument,
	CreateStaffDto,
	UpdateStaffDto
> {
	constructor(
		private readonly staffsService: StaffsService,
		connection: Connection,
		logsService: LogsService,
	) {
		super(staffsService, "staffs", connection);
	}
}
