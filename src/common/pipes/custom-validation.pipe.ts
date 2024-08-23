import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	UnprocessableEntityException,
} from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
	async transform(value: any, metadata: ArgumentMetadata) {
		try {
			return await super.transform(value, metadata);
		} catch (error) {
			if (error instanceof BadRequestException) {
				const errors = (error.getResponse() as any).message;
				throw new UnprocessableEntityException(errors);
			}
			throw error;
		}
	}
}
