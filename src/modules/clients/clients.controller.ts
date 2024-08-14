import {
	Controller,
	Get,
	Post,
	Body,
	// Patch,
	Param,
	Delete,
	Res,
	HttpStatus,
	// UseGuards,
	Req,
	Put,
} from "@nestjs/common";
import { ClientsService } from "@modules/clients/clients.service";
import { CreateClientDto } from "@modules/clients/dto/create-client.dto";
import { UpdateClientDto } from "@modules/clients/dto/update-client.dto";
import { AppController } from "@modules/app.controller";
import { ClientDocument } from "@modules/clients/entities/client.entity";
import { Response } from "express";
// import { AuthGuard } from "@guards/auth.guard";
// import { Roles } from "@decorators/roles.decorator";
// import RoleEnum from "@enums/user-role.enum";
import { Ownership } from "@decorators/ownership.decorator";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import UserRoleEnum from "@enums/user-role.enum";
import { Responses } from "@helpers/responses.helper";

@ApiTags("clients")
@Controller("clients")
export class ClientsController extends AppController<
	ClientDocument,
	CreateClientDto,
	UpdateClientDto
> {
	constructor(private readonly clientsService: ClientsService) {
		super(clientsService, "clients");
	}

	@ApiOperation({ summary: "Create a new client" })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: "The client has been successfully created.",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Bad Request.",
	})
	@ApiBearerAuth()
	@Post()
	async create(
		@Body() createClientDto: CreateClientDto,
		@Res() res: Response,
	) {
		return super.create(createClientDto, res);
	}

	@ApiOperation({ summary: "Get all clients" })
	@ApiResponse({ status: HttpStatus.OK, description: "Return all clients." })
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Clients not found.",
	})
	@Get()
	async findAll(@Res() res: Response) {
		return super.findAll(res);
	}

	@ApiOperation({ summary: "Get a client by id" })
	@ApiResponse({ status: HttpStatus.OK, description: "Return a client." })
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Client not found.",
	})
	@Get(":id")
	async findOne(@Param("id") id: string, @Res() res: Response) {
		return super.findOne(id, res);
	}

	@ApiOperation({ summary: "Update a client by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The client has been successfully updated.",
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Client not found.",
	})
	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateClientDto: UpdateClientDto,
		@Res() res: Response,
	) {
		console.log("update");

		return super.update(id, updateClientDto, res);
	}

	@ApiOperation({ summary: "Delete a client by id" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "The client has been successfully deleted.",
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Client not found.",
	})
	@Delete(":id")
	async remove(@Param("id") id: string, @Res() res: Response) {
		return super.remove(id, res);
	}

	// @ApiOperation({ summary: "Get all company clients" })
	// @ApiResponse({
	// 	status: HttpStatus.OK,
	// 	description: "Return all company clients.",
	// })
	// @ApiResponse({
	// 	status: HttpStatus.NOT_FOUND,
	// 	description: "Company clients not found.",
	// })
	// @Ownership()
	// @Get("me/all")
	// async findAllOwner(@Res() res: Response, @Req() req: Request) {
	// 	const user = req["user"];
	// 	const client = req["client"];
	// 	let path = "findAllOwner";
	// 	let method = "Get";

	// 	try {
	// 		const data = await this.clientsService.findWhere({
	// 			where: { ownerId: client.id.toString() },
	// 		});

	// 		if (!data || data?.length === 0) {
	// 			throw new Error("Not Found");
	// 		}
	// 		return Responses.getResponse({
	// 			res,
	// 			path,
	// 			method,
	// 			code: HttpStatus.OK,
	// 			subject: "clients",
	// 			data,
	// 		});
	// 	} catch (error) {
	// 		console.error(
	// 			`${"clients".toUpperCase()}Controller > ${path} : `,
	// 			error,
	// 		);
	// 		if (error.message === "Not Found") {
	// 			return Responses.getResponse({
	// 				res,
	// 				path,
	// 				method,
	// 				code: HttpStatus.NOT_FOUND,
	// 				subject: "clients",
	// 				data: error.message,
	// 			});
	// 		} else {
	// 			return Responses.getResponse({
	// 				res,
	// 				path,
	// 				method,
	// 				code: HttpStatus.INTERNAL_SERVER_ERROR,
	// 				subject: "clients",
	// 				data: error.message,
	// 			});
	// 		}
	// 	}
	// }
}
