import { LogsHelper } from "@modules/logs/helpers/logs.helper";
import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Res,
	Put,
	Req,
	Ip,
	HttpStatus,
	Patch,
} from "@nestjs/common";
import { UsersService } from "@modules/users/users.service";
import { CreateUserDto } from "@modules/users/dto/create-user.dto";
import { UpdateUserDto } from "@modules/users/dto/update-user.dto";
import { UserDocument } from "@modules/users/entities/user.entity";
import { AppController } from "@src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import type { Response, Request } from "express";
// import { AuthGuard } from "@guards/auth.guard";
import { Connection } from "mongoose";
import { AuthTypeExternProviderEnum } from "@enums/auth-type-provider.enum";
import { Hash } from "@helpers/hash.helper";
import { ResetPasswordDto } from "@dtos/reset-password.dto";
import { Responses } from "@helpers/responses.helper";

@ApiTags("users")
@Controller("users")
export class UsersController extends AppController<
	UserDocument,
	CreateUserDto,
	UpdateUserDto
> {
	constructor(
		private readonly usersService: UsersService,
		private readonly logsHelper: LogsHelper,
		connection: Connection,
	) {
		super(usersService, "users", connection);
	}

	// @ApiOperation({ summary: "Create a new user" })
	// @ApiResponse({
	// 	status: 201,
	// 	description: "The user has been successfully created.",
	// })
	// @ApiResponse({ status: 400, description: "Bad Request." })
	// @ApiBearerAuth()
	// @Post()
	// async create(
	// 	@Body() createUserDto: CreateUserDto,
	// 	@Res() res: Response,
	// ) {
	// 	const { role } = createUserDto;

	// 	if (!role) {
	// 		createUserDto.role = UserRoleEnum.CLIENT;
	// 	}

	// 	return super.create(createUserDto, res);
	// }

	@ApiOperation({ summary: "Get all users" })
	@ApiResponse({ status: 200, description: "Return all users." })
	@ApiResponse({ status: 404, description: "Users not found." })
	@Get()
	async findAll(@Res() res: Response, @Req() req: Request, @Ip() ip: string) {
		return super.findAll(res, req, ip);
	}

	@ApiOperation({ summary: "Get a user by id" })
	@ApiResponse({ status: 200, description: "Return a user." })
	@ApiResponse({ status: 404, description: "User not found." })
	@Get(":id")
	async findOne(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.findOne(id, res, req, ip);
	}

	@ApiOperation({ summary: "Update a user by id" })
	@ApiResponse({
		status: 200,
		description: "The user has been successfully updated.",
	})
	@ApiResponse({ status: 404, description: "User not found." })
	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateUserDto: UpdateUserDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.update(id, updateUserDto, res, req, ip);
	}

	@ApiOperation({ summary: "Delete a user by id" })
	@ApiResponse({
		status: 200,
		description: "The user has been successfully deleted.",
	})
	@ApiResponse({ status: 404, description: "User not found." })
	@Delete(":id")
	async remove(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.remove(id, res, req, ip);
	}

	// 	TODO: Google to email and email to google
	// @Post("link/provider-to-email")
	// async linkAccountProviderToEmail(
	// 	@Body() createPasswordDto: ResetPasswordDto,
	// 	@Res() res: Response,
	// 	@Req() req: Request,
	// 	@Ip() ip: string,
	// ) {
	// 	const path = "linkAccountProviderToEmail";
	// 	const method = "Post";
	// 	const session = await this.connection.startSession();
	// 	session.startTransaction();

	// 	const userInfos = req["userInfo"];

	// 	try {
	// 		// Hash the password
	// 		createPasswordDto.newPassword = await Hash.hashData(
	// 			createPasswordDto.newPassword,
	// 		);

	// 		// Update user and retrieve the user object without password
	// 		await this.usersService.update({
	// 			id: userInfo.user._id,
	// 			updateDto: {
	// 				password: createPasswordDto.newPassword,
	// 			},
	// 			session,
	// 		});

	// 		// Log registration activity
	// 		// await this.logsHelper.logInfo({
	// 		// 	req,
	// 		// 	ip,
	// 		// 	userId: user._id.toString(),
	// 		// 	email: user.email,
	// 		// 	message: `Confirmation email sent`,
	// 		// 	context: `AuthController > ${path}`,
	// 		// });

	// 		// Commit transaction
	// 		await session.commitTransaction();

	// 		return Responses.getResponse({
	// 			res,
	// 			path,
	// 			method,
	// 			code: HttpStatus.CREATED,
	// 			subject: "auth",
	// 			message: `User email linked successfully.`,
	// 			data: {
	// 				userInfos,
	// 			},
	// 		});
	// 	} catch (error: any) {
	// 		// Abort transaction in case of an error
	// 		await session.abortTransaction();
	// 		console.error(`AuthController > ${path}:`, error);

	// 		return Responses.getResponse({
	// 			res,
	// 			path,
	// 			method,
	// 			code: HttpStatus.INTERNAL_SERVER_ERROR,
	// 			subject: "auth",
	// 			error: "An error occurred while creating the account.",
	// 		});
	// 	} finally {
	// 		// End session
	// 		session.endSession();
	// 	}
	// }

	// TODO: Modifier password
	@Patch("change/password")
	async updatePassword(
		@Body() createPasswordDto: ResetPasswordDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {}

	// TODO:Modifier email + new confirmationde modification du mot de passe avec token
	@Patch("change/email")
	async updateEmail(
		@Body() createPasswordDto: ResetPasswordDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {}
}
