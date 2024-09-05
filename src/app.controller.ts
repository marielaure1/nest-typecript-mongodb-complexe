import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	Res,
	HttpStatus,
} from "@nestjs/common";
import { Connection, Document } from "mongoose";
import { AppService } from "src/app.service";
import { FastifyReply } from "fastify";
import { Responses } from "@helpers/responses.helper";
import { StringHelper } from "@helpers/string.helper";
import { InjectConnection } from "@nestjs/mongoose";

@Controller()
export abstract class AppController<
	AppModel extends Document,
	CreateDto,
	UpdateDto,
> {
	constructor(
		private readonly service: AppService<AppModel, CreateDto, UpdateDto>,
		private readonly schema: string,
		@InjectConnection() private readonly connection: Connection,
	) {}

	@Post()
	async create(@Body() createDto: CreateDto, @Res() res: FastifyReply) {
		const path = "create";
		const method = "Post";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Create the data in the service
			const data = await this.service.create(createDto);

			if (!data) {
				throw new Error("Not Found");
			}

			await session.commitTransaction();

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.CREATED,
				subject: this.schema,
				data: {
					[StringHelper.removeLastS(this.schema)]: data,
				},
			});
		} catch (error) {
			await session.abortTransaction();

			console.error(
				`${this.schema.toUpperCase()}Controller > ${path} : `,
				error,
			);

			if (error.message === "Not Found") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.UNPROCESSABLE_ENTITY,
					subject: this.schema,
					error: "The resource could not be created",
				});
			} else {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: this.schema,
					error: `An error occurred while creating the ${this.schema}`,
				});
			}
		} finally {
			session.endSession();
		}
	}

	@Get()
	async findAll(@Res() res: FastifyReply) {
		const path = "findAll";
		const method = "Get";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Retrieve all data
			const data = await this.service.findAll();

			if (!data || data.length === 0) {
				throw new Error("Not Found");
			}

			await session.commitTransaction();

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: this.schema,
				multiple: true,
				data: {
					[this.schema]: data,
				},
			});
		} catch (error) {
			await session.abortTransaction();

			console.error(
				`${this.schema.toUpperCase()}Controller > ${path} : `,
				error,
			);

			if (error.message === "Not Found") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.NOT_FOUND,
					subject: this.schema,
					multiple: true,
					error: "Not found",
				});
			} else {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: this.schema,
					multiple: true,
					error: `An error occurred while retrieving ${this.schema}`,
				});
			}
		} finally {
			session.endSession();
		}
	}

	@Get(":id")
	async findOne(@Param("id") id: string, @Res() res: FastifyReply) {
		const path = "findOne";
		const method = "Get";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Retrieve the data by ID
			const data = await this.service.findOneById(id);

			if (!data) {
				throw new Error("Not Found");
			}

			await session.commitTransaction();

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: this.schema,
				data: {
					[StringHelper.removeLastS(this.schema)]: data,
				},
			});
		} catch (error) {
			await session.abortTransaction();

			console.error(
				`${this.schema.toUpperCase()}Controller > ${path} : `,
				error,
			);

			if (error.message === "Not Found") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.NOT_FOUND,
					subject: this.schema,
					error: `The ${this.schema} with ID ${id} was not found`,
				});
			} else {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: this.schema,
					error: `An error occurred while retrieving the ${this.schema}`,
				});
			}
		} finally {
			session.endSession();
		}
	}

	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateDto: UpdateDto,
		@Res() res: FastifyReply,
	) {
		const path = "update";
		const method = "Put";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Attempt to update the entity with the given ID
			const data = await this.service.update(id, updateDto);

			if (!data) {
				throw new Error("Not Found");
			}

			await session.commitTransaction();

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: this.schema,
				data: {
					[StringHelper.removeLastS(this.schema)]: data,
				},
			});
		} catch (error) {
			await session.abortTransaction();

			console.error(
				`${this.schema.toUpperCase()}Controller > ${path} : `,
				error,
			);

			if (error.message === "Not Found") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.NOT_FOUND,
					subject: this.schema,
					error: `The ${this.schema} with ID ${id} was not found`,
				});
			} else {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: this.schema,
					error: `An error occurred while updating the ${this.schema}`,
				});
			}
		} finally {
			session.endSession();
		}
	}

	@Delete(":id")
	async remove(@Param("id") id: string, @Res() res: FastifyReply) {
		const path = "remove";
		const method = "Delete";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Attempt to find the entity by ID
			const data = await this.service.findOneById(id);

			if (!data) {
				throw new Error("Not Found");
			}

			// Proceed with the deletion
			await this.service.remove(id);

			await session.commitTransaction();

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.NO_CONTENT,
				subject: this.schema,
			});
		} catch (error) {
			await session.abortTransaction();

			console.error(
				`${this.schema.toUpperCase()}Controller > ${path} : `,
				error,
			);

			if (error.message === "Not Found") {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.NOT_FOUND,
					subject: this.schema,
					error: `The ${this.schema} with ID ${id} was not found`,
				});
			} else {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: this.schema,
					error: `An error occurred while deleting the ${this.schema}`,
				});
			}
		} finally {
			session.endSession();
		}
	}
}
