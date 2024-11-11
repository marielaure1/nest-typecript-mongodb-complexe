import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { Responses } from "@helpers/responses.helper";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<FastifyReply>();
		const request = ctx.getRequest<FastifyRequest>();

		const path = request.url;
		const method = request.method;

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const message =
			exception instanceof HttpException
				? (exception.getResponse() as any).message || exception.message
				: "An unexpected error occurred";

		// Utilisation de Responses.getResponse pour formater la réponse
		const formattedResponse = Responses.getResponse({
			path,
			method,
			code: status,
			subject: "Validation Error",
			error: message,
		});

		// Envoie explicitement la réponse avec Fastify
		response.status(status).send(formattedResponse);
	}
}
