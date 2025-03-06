// Base
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
	Ip,
	Req,
	Logger,
} from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";

// Dependencies
import { Connection, Document } from "mongoose";
// import { MongoServerError } from "mongodb";
import type { Response, Request } from "express";

// Services
import { AppService } from "@src/app.service";

// Helpers
import { Responses } from "@helpers/responses.helper";
import { StringHelper } from "@helpers/string.helper";

let logger = new Logger();

/**
 * Abstract controller providing common CRUD operations.
 *
 * @template AppModel - The Mongoose document type.
 * @template CreateDto - The DTO used for creating a resource.
 * @template UpdateDto - The DTO used for updating a resource.
 */
@Controller()
export abstract class AppController<
	AppModel extends Document,
	CreateDto,
	UpdateDto,
> {
	/**
	 * Initializes the AppController.
	 *
	 * @param {AppService<AppModel, CreateDto, UpdateDto>} service - The service handling database operations.
	 * @param {string} schema - The schema name used in responses.
	 * @param {Connection} connection - The MongoDB connection.
	 */
	constructor(
		private readonly service: AppService<AppModel, CreateDto, UpdateDto>,
		private readonly schema: string,
		@InjectConnection() readonly connection: Connection,
	) {}

	/**
	 * Creates a new resource.
	 *
	 * @param {CreateDto} createDto - The data for creating the resource.
	 * @param {Response} res - The response object.
	 * @param {Request} [req] - The request object.
	 * @param {string} [ip] - The IP address of the request.
	 * @returns {Promise<Response>} - The created resource response.
	 */
	@Post()
	async create(
		@Body() createDto: CreateDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Create the data in the service
			const data = await this.service.create({
				createDto,
			});

			await session.commitTransaction();

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.CREATED,
				data: {
					[StringHelper.removeLastS(this.schema)]: data,
				},
			});
		} catch (error: any) {
			await session.abortTransaction();

			if (error.code === 11000) {
				const field = Object.keys(error.keyPattern)[0];
				const value = error.keyValue[field];

				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.CONFLICT,
					error: `Duplicate key error.`,
					fieldsErrors: [
						{
							field,
							value,
						},
					],
					errorDatas: error,
				});
			}

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: `An error occurred while creating the ${this.schema}.`,
				errorDatas: error,
			});
		} finally {
			session.endSession();
		}
	}

	/**
	 * Retrieves all resources.
	 *
	 * @param {Response} res - The response object.
	 * @param {Request} [req] - The request object.
	 * @param {string} [ip] - The IP address of the request.
	 * @returns {Promise<Response>} - A list of resources.
	 */
	@Get()
	async findAll(@Res() res: Response, @Req() req: Request, @Ip() ip: string) {
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Retrieve all data
			const data = await this.service.findAll({});

			if (!data) {
				throw new Error("Not Found");
			}

			await session.commitTransaction();

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				multiple: true,
				data: {
					[this.schema]: data,
				},
			});
		} catch (error: any) {
			await session.abortTransaction();

			if (error.message === "Not Found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					multiple: true,
					error: "Not found.",
					errorDatas: error,
				});
			} else {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					multiple: true,
					error: `An error occurred while retrieving ${this.schema}.`,
					errorDatas: error,
				});
			}
		} finally {
			session.endSession();
		}
	}

	/**
	 * Retrieves a single resource by its ID.
	 *
	 * @param {string} id - The ID of the resource.
	 * @param {Response} res - The response object.
	 * @param {Request} [req] - The request object.
	 * @param {string} [ip] - The IP address of the request.
	 * @returns {Promise<Response>} - The requested resource.
	 */
	@Get(":id")
	async findOne(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Retrieve the data by ID
			const data = await this.service.findOneById({ id });

			if (!data) {
				throw new Error("Not Found");
			}

			await session.commitTransaction();

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				data: {
					[StringHelper.removeLastS(this.schema)]: data,
				},
			});
		} catch (error: any) {
			await session.abortTransaction();

			if (error.message === "Not Found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: `The ${this.schema} with ID ${id} was not found.`,
					errorDatas: error,
				});
			} else {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: `An error occurred while retrieving the ${this.schema}.`,
					errorDatas: error,
				});
			}
		} finally {
			session.endSession();
		}
	}

	/**
	 * Updates a resource by its ID.
	 *
	 * @param {string} id - The ID of the resource.
	 * @param {UpdateDto} updateDto - The data for updating the resource.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - The updated resource.
	 */
	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateDto: UpdateDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Attempt to update the entity with the given ID
			const data = await this.service.update({ id, updateDto });

			if (!data) {
				throw new Error("Not Found");
			}

			await session.commitTransaction();

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.OK,
				data: {
					[StringHelper.removeLastS(this.schema)]: data,
				},
			});
		} catch (error: any) {
			await session.abortTransaction();

			if (error.code === 11000) {
				const field = Object.keys(error.keyPattern)[0];
				const value = error.keyValue[field];

				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.CONFLICT,
					error: `Duplicate key error.`,
					fieldsErrors: [
						{
							field,
							value,
						},
					],
					errorDatas: error,
				});
			} else if (error.message === "Not Found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: `The ${this.schema} with ID ${id} was not found.`,
					errorDatas: error,
				});
			} else {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: `An error occurred while updating the ${this.schema}.`,
					errorDatas: error,
				});
			}
		} finally {
			session.endSession();
		}
	}

	/**
	 * Deletes a resource by its ID.
	 *
	 * @param {string} id - The ID of the resource.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - A confirmation of deletion.
	 */
	@Delete(":id")
	async remove(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			// Attempt to find the entity by ID
			const data = await this.service.findOneById({ id });

			if (!data) {
				throw new Error("Not Found");
			}

			// Proceed with the deletion
			await this.service.remove({ id });

			await session.commitTransaction();

			return Responses.getResponse({
				req,
				res,
				status: HttpStatus.NO_CONTENT,
			});
		} catch (error: any) {
			await session.abortTransaction();

			if (error.message === "Not Found") {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.NOT_FOUND,
					error: `The ${this.schema} with ID ${id} was not found.`,
					errorDatas: error,
				});
			} else {
				return Responses.getResponse({
					req,
					res,
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: `An error occurred while deleting the ${this.schema}.`,
					errorDatas: error,
				});
			}
		} finally {
			session.endSession();
		}
	}
}
