import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStaffDto } from "@modules/staffs/dto/create-staff.dto";
import { UpdateStaffDto } from "@modules/staffs/dto/update-staff.dto";
import { Staff, StaffDocument } from "@modules/staffs/entities/staff.entity";
import { AppService } from "@src/app.service";

@Injectable()
export class StaffsService extends AppService<
	StaffDocument,
	CreateStaffDto,
	UpdateStaffDto
> {
	constructor(
		@InjectModel(Staff.name)
		private staffsModel: Model<StaffDocument>,
	) {
		super(staffsModel);
	}
}
