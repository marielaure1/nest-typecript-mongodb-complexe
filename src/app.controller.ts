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
import { Document } from "mongoose";
import { AppService } from "src/app.service";
import { Response } from "express";
import { Responses } from "@helpers/responses.helper";
import { StringHelper } from "@helpers/string.helper";

@Controller()
export abstract class AppController<
	AppModel extends Document,
	CreateDto,
	UpdateDto,
> {
	constructor(
		private readonly service: AppService<AppModel, CreateDto, UpdateDto>,
		private readonly schema: string,
	) {}

	@Post()
	async create(@Body() createDto: CreateDto, @Res() res: Response) {
		const path = "create";
		const method = "Post";

		try {
			const data = await this.service.create(createDto);
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
					error: error.message,
				});
			} else {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: this.schema,
					error: `An error occured while creating the ${this.schema}`,
				});
			}
		}
	}

	@Get()
	async findAll(@Res() res: Response) {
		const path = "findAll";
		const method = "Get";

		try {
			const data = await this.service.findAll();

			if (!data || data.length === 0) {
				throw new Error("Not Found");
			}

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
					error: `Not found`,
				});
			} else {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					multiple: true,
					subject: this.schema,
					error: `An error occured while creating the ${this.schema}`,
				});
			}
		}
	}

	@Get(":id")
	async findOne(@Param("id") id: string, @Res() res: Response) {
		const path = "findOne";
		const method = "Get";

		try {
			const data = await this.service.findOne(id);

			if (!data) {
				throw new Error("Not Found");
			}

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
					error: error.message,
				});
			} else {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: this.schema,
					error: `An error occured while creating the ${this.schema}`,
				});
			}
		}
	}

	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateDto: UpdateDto,
		@Res() res: Response,
	) {
		const path = "update";
		const method = "Put";

		try {
			const data = await this.service.update(id, updateDto);

			if (!data) {
				throw new Error("Not Found");
			}

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
					error: error.message,
				});
			} else {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: this.schema,
					error: `An error occured while creating the ${this.schema}`,
				});
			}
		}
	}

	@Delete(":id")
	async remove(@Param("id") id: string, @Res() res: Response) {
		const path = "remove";
		const method = "Delete";

		try {
			const data = await this.service.findOne(id);

			if (!data) {
				throw new Error("Not Found");
			}

			await this.service.remove(id);

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.NO_CONTENT,
				subject: this.schema,
			});
		} catch (error) {
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
					error: error.message,
				});
			} else {
				return Responses.getResponse({
					res,
					path,
					method,
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					subject: this.schema,
					error: `An error occured while creating the ${this.schema}`,
				});
			}
		}
	}
}
