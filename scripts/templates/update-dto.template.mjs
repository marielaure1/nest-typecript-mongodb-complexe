import { PartialType } from "@nestjs/swagger";
import Create{{pascalCase}}Dto from "@modules/{{kebabCase}}s/dto/create-{{kebabCase}}.dto";

class Update{{pascalCase}}Dto extends PartialType(Create{{pascalCase}}Dto) {}

export default Update{{pascalCase}}Dto;