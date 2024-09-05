import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { settings } from "@constants/settings";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import fastifyCors from "fastify-cors";
import { CustomValidationPipe } from "@pipes/custom-validation.pipe";
import { GlobalExceptionFilter } from "@exceptions/validator.exception";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { RequestInterceptor } from "@interceptors/request.interceptor";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);

	app.register(fastifyCors, {
		origin: true,
	});

	app.useGlobalInterceptors(new RequestInterceptor());

	app.useGlobalPipes(
		new CustomValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.useGlobalFilters(new GlobalExceptionFilter());
	console.log("Global filters applied");

	const config = new DocumentBuilder()
		.setTitle("Api NOM_DU_PROJET")
		.setDescription("DESCRIPTION")
		.setVersion("1.0.0")
		.addTag("NOM_DU_PROJET")
		.build();
	const document = SwaggerModule.createDocument(app, config);

	app.setGlobalPrefix("api");
	console.log("Global prefix set");

	SwaggerModule.setup("api", app, document);

	await app.listen(settings.PORT, () => console.log(settings.PORT));
}
bootstrap();
