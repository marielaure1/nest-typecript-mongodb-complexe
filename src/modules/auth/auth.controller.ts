import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { UsersService } from "@modules/users/users.service";
import { ClientsService } from "@modules/clients/clients.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Responses } from "@helpers/responses.helper";
import { CreateAuthClientDto } from "@modules/auth/dto/create-auth-client.dto";
import { Response } from "express";
import { Mail } from "@services/mail/mail.service";
import { JwtService } from "@nestjs/jwt";
import { first } from "rxjs";
import { url } from "inspector";
import settings from "@constants/settings";
import { NotificationHelper } from "@helpers/notification.helper";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(
		private readonly userService: UsersService,
		private readonly clientService: ClientsService,
		private readonly mail: Mail,
		private readonly jwtService: JwtService,
	) {}

	@ApiOperation({ summary: "A new client sign up" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The client has been successfully created.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request.",
	})
	@Post("register")
	async register(
		@Body() createAuthClientDto: CreateAuthClientDto,
		@Res() res: Response,
	) {
		const path = "register";
		const method = "Post";

		try {
			NotificationHelper.isPhoneRequired(
				createAuthClientDto.phone,
				createAuthClientDto.notificationSms,
			);

			// let user = await this.userService.create(createAuthClientDto);
			// const client = await this.clientService.create({
			// 	...createAuthClientDto,
			// 	userId: user?._id?.toString(),
			// });

			// user = await this.userService.findOne(user?._id?.toString());

			// const payload = { sub: user._id, email: user.email };

			// const sendEmail = await this.mail.sendMail({
			// 	to: ["edjour.marie@gmail.com"],
			// 	sender: "edjour.marielaure@gmail.com",
			// 	subject: "Welcome to Booker",
			// 	template: "./confirmation",
			// 	templateDatas: {
			// 		firstName: client.firstName,
			// 		url: `${settings.FRONTEND_URL}auth/confirm/${this.jwtService.sign(payload)}`,
			// 	},
			// });

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: "auth",
				data: {
					// user,
					// client,
				},
			});
		} catch (error) {
			console.error(`AuthController > ${path} : `, error);

			if (
				error.message.includes(
					"E11000 duplicate key error collection: ",
				)
			) {
				let errorMessage = "";

				if (error.message.includes("email_1")) {
					errorMessage = "An account with this email already exists";
				} else if (error.message.includes("phone_1")) {
					errorMessage =
						"An account with this phone number already exists";
				}

				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.CONFLICT,
					subject: "auth",
					error: errorMessage || "An account already exists",
				});
			} else if(error.message == "Phone number is required") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.UNPROCESSABLE_ENTITY,
					subject: "auth",
					error: error.message,
				});
			} else {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: "auth",
					error: "An error occurred while creating the account",
				});
			}
		}
	}
}
