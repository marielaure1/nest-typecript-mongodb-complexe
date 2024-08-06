import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Res,
	Put,
} from "@nestjs/common";
import { {{pascalCase}}sService } from "@modules/{{kebabCase}}s/{{kebabCase}}s.service";
import { Create{{pascalCase}}Dto } from "@modules/{{kebabCase}}s/dto/create-{{kebabCase}}.dto";
import { Update{{pascalCase}}Dto } from "@modules/{{kebabCase}}s/dto/update-{{kebabCase}}.dto";
import { {{pascalCase}}Document } from "@modules/{{kebabCase}}s/entities/{{kebabCase}}.entity";
import { AppController } from "@modules/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("{{kebabCase}}s")
@Controller("{{kebabCase}}s")
export class {{pascalCase}}sController extends AppController<
	{{pascalCase}}Document,
	Create{{pascalCase}}Dto,
	Update{{pascalCase}}Dto
> {
	constructor(private readonly {{camelCase}}sService: {{pascalCase}}sService) {
		super({{camelCase}}sService, "{{camelCase}}s");
	}

	@ApiOperation({ summary: "Create a new {{camelCase}}" })
	@ApiResponse({
		status: 201,
		description: "The {{camelCase}} has been successfully created.",
	})
	@ApiResponse({ status: 400, description: "Bad Request." })
	@ApiBearerAuth()
	@Post()
	async create(@Body() create{{pascalCase}}Dto: Create{{pascalCase}}Dto, @Res() res: Response) {
		return super.create(create{{pascalCase}}Dto, res);
	}

	@ApiOperation({ summary: "Get all {{camelCase}}s" })
	@ApiResponse({ status: 200, description: "Return all {{camelCase}}s." })
	@ApiResponse({ status: 404, description: "{{pascalCase}}s not found." })
	@Get()
	async findAll(@Res() res: Response) {
		return super.findAll(res);
	}

	@ApiOperation({ summary: "Get a {{camelCase}} by id" })
	@ApiResponse({ status: 200, description: "Return a {{camelCase}}." })
	@ApiResponse({ status: 404, description: "{{pascalCase}} not found." })
	@Get(":id")
	async findOne(@Param("id") id: string, @Res() res: Response) {
		return super.findOne(id, res);
	}

	@ApiOperation({ summary: "Update a {{camelCase}} by id" })
	@ApiResponse({
		status: 200,
		description: "The {{camelCase}} has been successfully updated.",
	})
	@ApiResponse({ status: 404, description: "{{pascalCase}} not found." })
	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() update{{pascalCase}}Dto: Update{{pascalCase}}Dto,
		@Res() res: Response,
	) {
		return super.update(id, update{{pascalCase}}Dto, res);
	}

	@ApiOperation({ summary: "Delete a {{camelCase}} by id" })
	@ApiResponse({
		status: 200,
		description: "The {{camelCase}} has been successfully deleted.",
	})
	@ApiResponse({ status: 404, description: "{{pascalCase}} not found." })
	@Delete(":id")
	async remove(@Param("id") id: string, @Res() res: Response) {
		return super.remove(id, res);
	}
}
