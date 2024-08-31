import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Res,
	HttpStatus,
	Put,
	Req,
	Ip,
} from "@nestjs/common";
import { ClientsService } from "@modules/clients/clients.service";
import { CreateClientDto } from "@modules/clients/dto/create-client.dto";
import { UpdateClientDto } from "@modules/clients/dto/update-client.dto";
import { AppController } from "src/app.controller";
import { ClientDocument } from "@modules/clients/entities/client.entity";
import { Response, Request } from "express";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { LogHelper } from "@modules/logs/helpers/log.helper";
import { Connection } from "mongoose";

@ApiTags("clients")
@Controller("clients")
export class ClientsController extends AppController<
	ClientDocument,
	CreateClientDto,
	UpdateClientDto
> {
	constructor(
		private readonly clientsService: ClientsService,
		logHelper: LogHelper,
		connection: Connection,
	) {
		super(clientsService, "clients", connection, logHelper);
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
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.create(createClientDto, res, req, ip);
	}

	@ApiOperation({ summary: "Get all clients" })
	@ApiResponse({ status: HttpStatus.OK, description: "Return all clients." })
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Clients not found.",
	})
	@ApiBearerAuth()
	@Get()
	async findAll(@Res() res: Response, @Req() req: Request, @Ip() ip: string) {
		return super.findAll(res, req, ip);
	}

	@ApiOperation({ summary: "Get a client by id" })
	@ApiResponse({ status: HttpStatus.OK, description: "Return a client." })
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Client not found.",
	})
	@ApiBearerAuth()
	@Get(":id")
	async findOne(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.findOne(id, res, req, ip);
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
	@ApiBearerAuth()
	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateClientDto: UpdateClientDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		console.log("update");

		return super.update(id, updateClientDto, res, req, ip);
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
	@ApiBearerAuth()
	@Delete(":id")
	async remove(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		return super.remove(id, res, req, ip);
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
