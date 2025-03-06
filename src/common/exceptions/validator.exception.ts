import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	BadRequestException,
} from "@nestjs/common";
import { ValidationError } from "class-validator";
import type { Response, Request } from "express";

/**
 * Exception filter for handling validation errors.
 */
@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
	/**
	 * Catches and processes validation exceptions.
	 *
	 * @param {BadRequestException} exception - The exception thrown.
	 * @param {ArgumentsHost} host - The arguments host providing execution context.
	 */
	catch(exception: BadRequestException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const status = exception.getStatus();

		const exceptionResponse = exception.getResponse() as {
			message: ValidationError[];
		};

		const res = ctx.getResponse<Response>();

		if (status == 400) {
			res.status(status).json({
				status: status,
				success: false,
				error: "Invalid credentials",
				fieldsErrors: exceptionResponse.message,
			});
		} else {
			res.status(status).json({
				status: status,
				success: false,
				error: "An error occurred - Validation Dto",
			});
		}

		console.error("[ERROR_DATAS] :", exception.getResponse());
	}
}
