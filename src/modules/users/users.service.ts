import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "@modules/users/dto/create-user.dto";
// import { UpdateUserDto } from "@modules/users/dto/update-user.dto";
// import { UpdateUserPasswordDto } from "@modules/users/dto/update-user-password.dto";
import { User, UserDocument } from "@modules/users/entities/user.entity";
import { AppService } from "@src/app.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import axios from "axios";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { Token } from "@helpers/token.helper";
import { TokenTypeEnum } from "@enums/token-type.enum";

@Injectable()
export class UsersService extends AppService<
	UserDocument,
	CreateUserDto,
	UpdateUserDto
> {
	private readonly logger = new Logger(UsersService.name);

	constructor(
		@InjectModel(User.name) private usersModel: Model<UserDocument>,
		private readonly mailHelper: MailHelper,
	) {
		super(usersModel);
	}

	async findOneByEmail(email: string): Promise<User> {
		try {
			const findOne = await this.usersModel
				.findOne({
					filter: { email },
				})
				.exec();

			return findOne;
		} catch (error: any) {
			this.logger.error(
				`[ERROR] => UsersModule > UsersService > findOneByEmail : `,
				error,
			);
		}
	}

	async validateOAuthLoginWithAccessToken(accessToken: string): Promise<any> {
		try {
			const response = await axios.get(
				"https://www.googleapis.com/oauth2/v3/userinfo",
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				},
			);

			return response.data;
		} catch (error: any) {
			this.logger.error(
				`[ERROR] => UsersModule > UsersService > validateOAuthLoginWithAccessToken : `,
				error,
			);
			throw new Error("Invalid Google token");
		}
	}

	async sendConfirmAccountUser({
		user,
		canThrowError = false,
	}: {
		user: UserDocument;
		canThrowError?: boolean;
	}) {
		try {
			const newToken = await Token.generateToken({
				sub: user._id,
				email: user.email,
				type: TokenTypeEnum.CONFIRMATION_ACCOUNT,
			});

			// Email confirmation for the client
			await this.mailHelper.sendConfirmAccountUser({
				to: [user.email],
				templateDatas: {
					// firstName: client[0].firstName,
					token: newToken,
				},
			});
		} catch (error: any) {
			this.logger.error(
				`[ERROR] => UsersModule > UsersService > sendConfirmAccountUser : `,
				JSON.stringify(error),
			);

			if (canThrowError) {
				throw new Error("Email could not be sent");
			}
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
	// 	} catch (error: any) {
	// 		console.log(error);
	// 	}
	// }
}
