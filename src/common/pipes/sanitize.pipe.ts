// Base
import {
	PipeTransform,
	Injectable,
	ArgumentMetadata,
	BadRequestException,
} from "@nestjs/common";

// Depedencies
import sanitizeHtml from "sanitize-html";

// Helpers
import { SanitizeHelper } from "@helpers/sanitize.helper";

// DTOs
import { CreateUserDto } from "@modules/users/dto/create-user.dto";
import { CreateAuthClientDto } from "@modules/auth/dto/create-auth-client.dto";

interface SanitizationConfig {
	dto: Function;
	fields: string[];
}

// For these DTOs, we allow certain fields to contain controlled HTML.
const sanitizationConfigs: SanitizationConfig[] = [
	{ dto: CreateUserDto, fields: ["password"] },
	{ dto: CreateAuthClientDto, fields: ["password"] },
];

@Injectable()
export class SanitizePipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (typeof value === "string") {
			// If the value is a string
			const sanitized = sanitizeHtml(value, {
				allowedTags: [],
				allowedAttributes: {},
			});
			if (sanitized !== value) {
				throw new BadRequestException({
					message: [
						{
							field: "string",
							errors: ["HTML that is not allowed."],
						},
					],
					error: "Bad Request",
					status: 400,
				});
			}
			return sanitized;
		} else if (typeof value === "object" && value !== null) {
			//  If the value is an object
			if (metadata.metatype) {
				const config = sanitizationConfigs.find(
					(conf) => conf.dto === metadata.metatype,
				);
				if (config) {
					// For each field defined in the configuration, apply the wysiwyg sanitization.
					config.fields.forEach((field) => {
						if (value[field] && typeof value[field] === "string") {
							const sanitized =
								SanitizeHelper.sanitizeWysiwygInput(
									value[field],
								);
							// If the sanitized value differs.
							if (sanitized !== value[field]) {
								throw new BadRequestException({
									message: [
										{
											field,
											errors: [
												"HTML that is not allowed.",
											],
										},
									],
									error: "Bad Request",
									status: 400,
								});
							}
							value[field] = sanitized;
						}
					});
				}
			}

			// For other fields that are not specified in the configuration (and should not contain HTML),
			for (const key of Object.keys(value)) {
				// Skip fields that have already been processed via the DTO configuration.
				if (
					metadata.metatype &&
					sanitizationConfigs.some(
						(conf) =>
							conf.dto === metadata.metatype &&
							conf.fields.includes(key),
					)
				) {
					continue;
				}
				if (typeof value[key] === "string") {
					const sanitized = sanitizeHtml(value[key], {
						allowedTags: [],
						allowedAttributes: {},
					});
					// If the cleaned value differs from the original, throw an error.
					if (sanitized !== value[key]) {
						throw new BadRequestException({
							message: [
								{
									field: key,
									errors: ["HTML that is not allowed."],
								},
							],
							error: "Bad Request",
							status: 400,
						});
					}
					value[key] = sanitized;
				}
			}
		}
		return value;
	}
}
