import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	UnprocessableEntityException,
} from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";

/**
 * Custom validation pipe that extends NestJS's built-in `ValidationPipe`.
 * Transforms and validates incoming request data while converting `BadRequestException`
 * into `UnprocessableEntityException` for better error handling.
 */
@Injectable()
export class CustomValidationPipe extends ValidationPipe {
	/**
	 * Transforms and validates the incoming request data.
	 *
	 * @param {any} value - The value to validate.
	 * @param {ArgumentMetadata} metadata - Metadata about the parameter being validated.
	 * @returns {Promise<any>} - The transformed and validated value.
	 * @throws {UnprocessableEntityException} If validation fails, it throws an `UnprocessableEntityException` instead of `BadRequestException`.
	 */
	async transform(value: any, metadata: ArgumentMetadata) {
		try {
			return await super.transform(value, metadata);
		} catch (error: any) {
			if (error instanceof BadRequestException) {
				const errors = (error.getResponse() as any).message;
				throw new UnprocessableEntityException(errors);
			}
			throw error;
		}
	}
}
