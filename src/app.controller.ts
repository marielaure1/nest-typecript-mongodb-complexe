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
	Req,
	Ip,
} from "@nestjs/common";
import { Connection, Document } from "mongoose";
import { AppService } from "src/app.service";
import { Response, Request } from "express";
import { Responses } from "@helpers/responses.helper";
import { StringHelper } from "@helpers/string.helper";
import { LogLevelEnum } from "@enums/log-level.enum";
import { LogHelper } from "@modules/logs/helpers/log.helper";
import { InjectConnection } from "@nestjs/mongoose";

@Controller()
export abstract class AppController<
	AppModel extends Document,
	CreateDto,
	UpdateDto,
> {
	protected readonly logHelper: LogHelper;

	constructor(
		private readonly service: AppService<AppModel, CreateDto, UpdateDto>,
		private readonly schema: string,
		@InjectConnection() private readonly connection: Connection,
		logHelper: LogHelper,
	) {
		this.logHelper = logHelper;
	}

	@Post()
	async create(
		@Body() createDto: CreateDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const path = "create";
		const method = "Post";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			const data = await this.service.create(createDto);

			if (!data) {
				this.logHelper.log({
					ip: ip,
					user: req["user"],
					userInfos: req["userInfos"],
					level: LogLevelEnum.ERROR,
					message: `Created ${this.schema}`,
					context: path,
					metadata: { data },
				});

				throw new Error("Not Found");
			}

			this.logHelper.log({
				ip: ip,
				user: req["user"],
				userInfos: req["userInfos"],
				level: LogLevelEnum.INFO,
				message: `Created ${this.schema}`,
				context: path,
				metadata: { data },
			});

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
		} finally {
			session.endSession();
		}
	}

	@Get()
	async findAll(@Res() res: Response, @Req() req: Request, @Ip() ip: string) {
		const path = "findAll";
		const method = "Get";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			const data = await this.service.findAll();

			if (!data || data.length === 0) {
				throw new Error("Not Found");
			}

			this.logHelper.log({
				ip: ip,
				user: req["user"],
				userInfos: req["userInfos"],
				level: LogLevelEnum.INFO,
				message: `Retrieved all ${this.schema}`,
				context: path,
				metadata: { data },
			});

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
		} finally {
			session.endSession();
		}
	}

	@Get(":id")
	async findOne(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const path = "findOne";
		const method = "Get";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			const data = await this.service.findOne(id);

			if (!data) {
				throw new Error("Not Found");
			}

			this.logHelper.log({
				ip: ip,
				user: req["user"],
				userInfos: req["userInfos"],
				level: LogLevelEnum.INFO,
				message: `Retrieved all ${this.schema}`,
				context: path,
				metadata: { data },
			});

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
		} finally {
			session.endSession();
		}
	}

	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateDto: UpdateDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const path = "update";
		const method = "Put";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			const data = await this.service.update(id, updateDto);

			if (!data) {
				throw new Error("Not Found");
			}

			this.logHelper.log({
				ip: ip,
				user: req["user"],
				userInfos: req["userInfos"],
				level: LogLevelEnum.INFO,
				message: `Created ${this.schema}`,
				context: path,
				metadata: { data },
			});

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
		} finally {
			session.endSession();
		}
	}

	@Delete(":id")
	async remove(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		const path = "remove";
		const method = "Delete";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			const data = await this.service.findOne(id);

			if (!data) {
				throw new Error("Not Found");
			}

			await this.service.remove(id);

			this.logHelper.log({
				ip: ip,
				user: req["user"],
				userInfos: req["userInfos"],
				level: LogLevelEnum.INFO,
				message: `Created ${this.schema}`,
				context: path,
				metadata: { data },
			});

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
		} finally {
			session.endSession();
		}
	}
}
