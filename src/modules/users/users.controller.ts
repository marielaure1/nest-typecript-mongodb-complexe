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
} from "@nestjs/common";
import { UsersService } from "@modules/users/users.service";
import { CreateUserDto } from "@modules/users/dto/create-user.dto";
import { UpdateUserDto } from "@modules/users/dto/update-user.dto";
import { UserDocument } from "@modules/users/entities/user.entity";
import { AppController } from "src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { Response, Request } from "express";
// import { AuthGuard } from "@guards/auth.guard";
import { UserRoleEnum } from "@enums/user-role.enum";
import { LogHelper } from "@modules/logs/helpers/log.helper";
import { Connection } from "mongoose";

@ApiTags("users")
@Controller("users")
export class UsersController extends AppController<
	UserDocument,
	CreateUserDto,
	UpdateUserDto
> {
	constructor(
		private readonly usersService: UsersService,
		logHelper: LogHelper,
		connection: Connection,
	) {
		super(usersService, "users", connection, logHelper);
	}

	@ApiOperation({ summary: "Create a new user" })
	@ApiResponse({
		status: 201,
		description: "The user has been successfully created.",
	})
	@ApiResponse({ status: 400, description: "Bad Request." })
	@ApiBearerAuth()
	@Post()
	async create(
		@Body() createUserDto: CreateUserDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const { role } = createUserDto;

		if (!role) {
			createUserDto.role = UserRoleEnum.CLIENT;
		}

		return super.create(createUserDto, res, req, ip);
	}

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
}
