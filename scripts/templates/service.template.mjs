import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Create{{pascalCase}}Dto } from "@modules/{{kebabCase}}s/dto/create-{{kebabCase}}.dto";
import { Update{{pascalCase}}Dto } from "@modules/{{kebabCase}}s/dto/update-{{kebabCase}}.dto";
import { {{pascalCase}}, {{pascalCase}}Document } from "@modules/{{kebabCase}}s/entities/{{kebabCase}}.entity";
import { AppService } from "@modules/app.service";

@Injectable()
export class {{pascalCase}}sService extends AppService<
	{{pascalCase}}Document,
	Create{{pascalCase}}Dto,
	Create{{pascalCase}}Dto
> {
	constructor(
		@InjectModel({{pascalCase}}.name) private {{camelCase}}sModel: Model<{{pascalCase}}Document>,
	) {
		super({{camelCase}}sModel);
	}
}
