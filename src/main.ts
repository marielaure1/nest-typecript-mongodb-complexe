import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { settings } from "@constants/settings";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as bodyParser from "body-parser";
import { CustomValidationPipe } from "@pipes/custom-validation.pipe";
import { GlobalExceptionFilter } from "@exceptions/validator.exception";

// import * as fs from "fs";
// import * as yaml from "js-yaml";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.use(bodyParser.json());

	app.useGlobalPipes(
		new CustomValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.useGlobalFilters(new GlobalExceptionFilter());

	const config = new DocumentBuilder()
		.setTitle("Api NOM_DU_PROJET")
		.setDescription("DESCRIPTION")
		.setVersion("1.0.0")
		.addTag("NOM_DU_PROJET")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	app.setGlobalPrefix("api");
	SwaggerModule.setup("api", app, document);

	// // Export as JSON
	// fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

	// // Export as YAML
	// fs.writeFileSync('./swagger.yaml', yaml.dump(document));

	await app.listen(settings.PORT, () => console.log(settings.PORT));
}
bootstrap();
