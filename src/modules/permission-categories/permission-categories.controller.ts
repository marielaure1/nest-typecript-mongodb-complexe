import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { PermissionCategoriesService } from "@modules/permission-categories/permission-categories.service";
import { CreatePermissionCategorieDto } from "@modules/permission-categories/dto/create-permission-categorie.dto";
import { UpdatePermissionCategorieDto } from "@modules/permission-categories/dto/update-permission-categorie.dto";
import { PermissionCategorieDocument } from "@modules/permission-categories/entities/permission-categorie.entity";
import { AppController } from "@src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { FastifyRequest, FastifyReply } from "fastify";
import { Connection } from "mongoose";
import { Responses } from "@helpers/responses.helper";

@ApiTags("permission-categories")
@Controller("permission-categories")
export class PermissionCategoriesController extends AppController<
	PermissionCategorieDocument,
	CreatePermissionCategorieDto,
	UpdatePermissionCategorieDto
> {
	constructor(
		private readonly permissionCategoriesService: PermissionCategoriesService,
		private readonly connection: Connection,
	) {
		super(permissionCategoriesService, "permissionCategories", connection);
	}

	@ApiOperation({ summary: "Get all permission categories" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Return all permission categories.",
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Permission categories not found.",
	})
	@ApiBearerAuth()
	@Get()
	async findAll(@Res() res: FastifyReply) {
		const path = "findAll";
		const method = "Get";
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			const permissionCategories =
				await this.permissionCategoriesService.findAll();

			await session.commitTransaction();

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.OK,
				subject: "permissionCategories",
				multiple: true,
				data: {
					permissionCategories: permissionCategories,
				},
			});
		} catch (error) {
			await session.abortTransaction();
			console.error(`PermissionCategoriesController > ${path} : `, error);

			return Responses.getResponse({
				res,
				path,
				method,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				subject: "permissionCategories",
				multiple: true,
				data: {
					permissionCategories: [],
				},
			});
		} finally {
			session.endSession();
		}
	}
}
