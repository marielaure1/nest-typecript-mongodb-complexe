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
} from "@nestjs/common";
import { ClientsService } from "@modules/clients/clients.service";
import { CreateClientDto } from "@modules/clients/dto/create-client.dto";
import { UpdateClientDto } from "@modules/clients/dto/update-client.dto";
import { AppController } from "src/app.controller";
import { ClientDocument } from "@modules/clients/entities/client.entity";
import { FastifyReply } from "fastify";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";

import { Connection } from "mongoose";
import { Responses } from "@helpers/responses.helper";

@ApiTags("clients")
@Controller("clients")
export class ClientsController {
	constructor(
		private readonly clientsService: ClientsService,
		private readonly connection: Connection,
	) {}

	@ApiOperation({ summary: "Get all clients" })
	@ApiResponse({ status: HttpStatus.OK, description: "Return all clients." })
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Clients not found.",
	})
	@ApiBearerAuth()
	@Get()
	async findAll(@Res() res: FastifyReply) {
		const path = "findAll";
		const method = "Get";

		console.log("findAll");

		try {
			const clients = await this.clientsService.findAllWithUsers({
				firstName: "Client 14",
				"user.role": "CLIENT",
			});

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: "clients",
				multiple: true,
				data: {
					clients: clients,
				},
			});
		} catch (error) {
			console.error(`ClientsController > ${path} : `, error);

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "clients",
				error: "An error occurred while retrieving clients with users",
			});
		}
	}

	@ApiOperation({ summary: "Get a client by id" })
	@ApiResponse({ status: HttpStatus.OK, description: "Return a client." })
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Client not found.",
	})
	@ApiBearerAuth()
	@Get(":id")
	async findOne(@Param("id") id: string, @Res() res: FastifyReply) {
		// return super.findOne(id, res);
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
		@Res() res: FastifyReply,
	) {
		console.log("update");

		// return super.update(id, updateClientDto, res);
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
	async remove(@Param("id") id: string, @Res() res: FastifyReply) {
		// return super.remove(id, res);
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
	// async findAllOwner(@Res() res: FastifyReply, @Req() req: FastifyRequest) {
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
