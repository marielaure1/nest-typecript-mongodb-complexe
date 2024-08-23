import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "@modules/users/dto/create-user.dto";
// import { UpdateUserDto } from "@modules/users/dto/update-user.dto";
// import { UpdateUserPasswordDto } from "@modules/users/dto/update-user-password.dto";
import { User, UserDocument } from "@modules/users/entities/user.entity";
import { AppService } from "@modules/app.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService extends AppService<
	UserDocument,
	CreateUserDto,
	UpdateUserDto
> {
	constructor(
		@InjectModel(User.name) private usersModel: Model<UserDocument>,
	) {
		super(usersModel);
	}

	async findOneBySupabaseUid(uid: string) {
		const me = await this.usersModel.findOne({ uid }).exec();
		return me;
	}

	async findOneByEmail(email: string): Promise<User> {
		try {
			const findOne = await this.usersModel.findOne({ email }).exec();

			return findOne;
		} catch (error) {
			console.log(
				"UsersModule > UsersService > findOneByEmail : ",
				error,
			);
		}
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
