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

		Responses.getResponse({
			res: response,
			path,
			method,
			code: status,
			subject: "Validation Error",
			error: message,
		});
	}
}
