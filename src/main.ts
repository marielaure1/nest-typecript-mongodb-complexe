// Base
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import {
	ExpressAdapter,
	NestExpressApplication,
} from "@nestjs/platform-express";

// Dependencies
import cookieParser from "cookie-parser";
import helmet from "helmet";

// Configs
import { CONFIG } from "@config/config";
import { basicRateLimit } from "@config/security/rate-limit.config";
import { configService } from "@constants/env";

// Interceptors
import { RequestInterceptor } from "@interceptors/request.interceptor";

// Pipes
import { SanitizePipe } from "@pipes/sanitize.pipe";

// Enums
import { TokenTypeEnum } from "@enums/token-type.enum";

// Modules
import { AppModule } from "@src/app.module";
import { json } from "express";
import bodyParser from "body-parser";

/**
 * Bootstrap function to initialize the NestJS application.
 */
async function bootstrap() {
	/**
	 * Creates a NestJS application instance with Express.
	 */
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter(),
	);

	/**
	 * Enables CORS to allow requests from the frontend.
	 */
	app.enableCors({
		origin: [
			/^http:\/\/localhost:\d+$/,
			configService.get<string>("FRONTEND_URL"),
		],
		methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
		credentials: true,
	});

	app.use(
		json({
			verify: (req: any, res, buf) => {
				req.rawBody = buf;
			},
		}),
	);

	app.use("/webhook/stripe", bodyParser.raw({ type: "application/json" }));
	/**
	 * Adds cookie parser middleware with a secret for secure cookies.
	 */
	app.use(
		cookieParser(
			configService.get<string>("COOKIE_SECRET") ||
				"secure_cookie_secret",
		),
	);
	app.use(
		helmet({
			// CSP
			contentSecurityPolicy: true,
			// Hsts
			hsts: true,
			// Frameguard: deny iframes
			frameguard: { action: "deny" },
			// X-Content-Type-Options
			noSniff: true,
			// Referrer-Policy
			referrerPolicy: {
				policy: "strict-origin-when-cross-origin",
			},
			// X-XSS-Protection (xssFilter)
			xssFilter: true,
		}),
	);

	app.use(basicRateLimit);

	app.useGlobalInterceptors(new RequestInterceptor());

	/**
	 * Registers a global validation pipe for request validation.
	 * - `whitelist: true`: Strips non-whitelisted properties from the request body.
	 * - `forbidNonWhitelisted: true`: Throws an error if unknown properties are present.
	 * - `transform: true`: Automatically transforms request payloads into DTOs.
	 * - Custom exception factory for detailed validation errors.
	 */
	app.useGlobalPipes(
		// new SanitizePipe(),
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			exceptionFactory: (errors) => {
				return new BadRequestException(
					errors.map((error) => ({
						field: error.property,
						errors: Object.values(error.constraints || {}),
					})),
				);
			},
		}),
	);

	/**
	 * Configures Swagger API documentation.
	 */
	const config = new DocumentBuilder()
		.setTitle(CONFIG.infos.api.title)
		.setDescription(CONFIG.infos.api.description)
		.setVersion(CONFIG.infos.api.version)
		.addTag(CONFIG.infos.api.tags)
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				description:
					"Provide an ACCESS token for accessing protected routes.",
			},
			TokenTypeEnum.ACCESS,
		)
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				description:
					"Provide a REFRESH token for regenerating access tokens.",
			},
			TokenTypeEnum.REFRESH,
		)
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				description:
					"Provide a CONFIRMATION_ACCOUNT token for confirming user accounts.",
			},
			TokenTypeEnum.CONFIRMATION_ACCOUNT,
		)
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				description:
					"Provide a RESET_PASSWORD token for resetting passwords.",
			},
			TokenTypeEnum.RESET_PASSWORD,
		)
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				description:
					"Provide an INIT_PASSWORD token for initializing passwords.",
			},
			TokenTypeEnum.INIT_PASSWORD,
		)
		.build();

	/**
	 * Creates Swagger documentation for the application.
	 */
	const document = SwaggerModule.createDocument(app, config);

	/**
	 * Sets the global API prefix.
	 */
	app.setGlobalPrefix(CONFIG.infos.api.prefix);

	/**
	 * Configures Swagger at the specified API prefix.
	 */
	SwaggerModule.setup(CONFIG.infos.api.prefix, app, document);

	/**
	 * Starts the application on the specified port.
	 */
	const port =
		configService.get<string>("API_PORT") || (await getAvailablePort());
	const server = await app.listen(port, "0.0.0.0", () =>
		console.log(`Listening on port ${port}`),
	);

	process.on("SIGTERM", () => {
		console.log("Closing server...");
		server.close(() => {
			console.log("Server closed.");
			process.exit(0);
		});
	});
}

bootstrap();

async function getAvailablePort(): Promise<number> {
	const server = require("net").createServer();
	return new Promise((resolve, reject) => {
		server.listen(0, () => {
			const address = server.address();
			server.close(() => resolve(address.port));
		});
		server.on("error", (err: any) => reject(err));
	});
}
