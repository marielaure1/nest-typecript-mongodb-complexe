import { Module } from '@nestjs/common';
import { {{pascalCase}}Controller } from '@modules/{{kebabCase}}s/{{kebabCase}}.controller';
import { {{pascalCase}}Service } from '@modules/{{kebabCase}}s/{{kebabCase}}.service';

@Module({
  imports: [],
  controllers: [{{pascalCase}}Controller],
  providers: [{{pascalCase}}Service],
})
export class {{pascalCase}}Module {}
