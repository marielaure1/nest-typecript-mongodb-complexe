import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "@modules/users/dto/create-user.dto";
// import { UpdateUserDto } from "@modules/users/dto/update-user.dto";
// import { UpdateUserPasswordDto } from "@modules/users/dto/update-user-password.dto";
import { User, UserDocument } from "@modules/users/entities/user.entity";
import { AppService } from "src/app.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BookerEmployeesService } from "@modules/booker-employees/booker-employees.service";
import { BookerEmployeeDocument } from "@modules/booker-employees/entities/booker-employee.entity";
import { ClientsService } from "@modules/clients/clients.service";
import { ClientDocument } from "@modules/clients/entities/client.entity";
import { EmployeesService } from "@modules/employees/employees.service";
import { EmployeeDocument } from "@modules/employees/entities/employee.entity";
import { UserHelper } from "./helpers/user.helper";
import { GetUserTypeInfosProps } from "./interfaces/user.interface";

@Injectable()
export class UsersService extends AppService<
	UserDocument,
	CreateUserDto,
	UpdateUserDto
> {
	constructor(
		@InjectModel(User.name) private usersModel: Model<UserDocument>,
		private readonly bookerEmployeesService: BookerEmployeesService,
		private readonly employeesService: EmployeesService,
		private readonly clientService: ClientsService,
		private readonly userHelper: UserHelper,
	) {
		super(usersModel);
	}

	async getUserTypeInfos(
		getUserTypeInfosProps: GetUserTypeInfosProps,
		session?: any,
	) {
		let user: UserDocument = null;

		if (getUserTypeInfosProps.id) {
			user = await this.findOneById(getUserTypeInfosProps.id, session);
		} else if (getUserTypeInfosProps.email) {
			user = await this.findOne(
				{ email: getUserTypeInfosProps.email },
				session,
			);
		}

		if (!user) {
			throw new Error("User not found");
		}

		let userInfo:
			| BookerEmployeeDocument
			| EmployeeDocument
			| ClientDocument = null;

		const userType = UserHelper.getUserType(user.role);

		if (userType === "Booker") {
			// Find Booker employee
			userInfo = await this.bookerEmployeesService.findOne(
				{ userId: user._id.toString() },
				session,
			);

			if (!userInfo) {
				throw new Error("Booker employee not found");
			}
		} else if (userType === "Employee") {
			// Find Employee
			userInfo = await this.employeesService.findOne(
				{ userId: user._id.toString() },
				session,
			);

			if (!userInfo) {
				throw new Error("Employee not found");
			}
		} else {
			// Find Client
			userInfo = await this.clientService.findOne(
				{ userId: user._id.toString() },
				session,
			);

			if (!userInfo) {
				throw new Error("Client not found");
			}
		}

		return { user, userInfo, userType };
	}

	// async updateEmail(
	// 	email: string,
	// 	updateUserEmailDto: UpdateUserEmailDto,
	// ): Promise<User> {
	// 	try {
	// 		const findOne = await this.usersModel.findOne({ email }).exec();

	// 		return this.usersModel
	// 			.findOneAndUpdate({ email }, updateUserEmailDto)
	// 			.exec();
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }
}
