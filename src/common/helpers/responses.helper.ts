import { HttpStatus, Logger } from "@nestjs/common";
import type { Response, Request } from "express";
import { StringHelper } from "@helpers/string.helper";
import { NumberHelper } from "@helpers/number.helper";

let logger = new Logger();
/**
 * Interface defining the properties required for constructing a response.
 */
interface ResponsesProps {
	req: Request;
	/** The Express response object. */
	res: Response;
	/** The API route path. */
	path?: string;
	/** The HTTP status code of the response. */
	status: number;
	/** The subject of the request (e.g., "user", "product"). */
	subject?: string;
	/** The data to return in case of a successful response (optional). */
	data?: object;
	/** The error message or object in case of failure (optional). */
	error?: object | string;
	/** A custom message for the response (optional). */
	message?: string;
	/** Indicates if multiple items are involved (optional). */
	multiple?: boolean;

	fieldsErrors?: any;

	errorDatas?: any;
}

/**
 * Utility class for generating standardized API responses.
 */
export class Responses {
	/**
	 * Generates a standardized JSON response for API endpoints.
	 *
	 * @param {ResponsesProps} params - The response parameters.
	 */
	public static getResponse(params: ResponsesProps) {
		// let loggerService: LoggerService;
		let success: boolean = false;
		let statusMessage: string;
		let action: string;
		let schema: string;
		let subject = params.subject || params.req.url.split("/")[1];

		if (NumberHelper.startsWith(params.status, 2)) {
			success = true;
			statusMessage = "success";
		} else {
			success = false;
			statusMessage =
				this.getStatusText(params.status).toLowerCase() || "error";
		}

		switch (params.req.method.toLowerCase()) {
			case "get":
				action = "retrieved";
				break;
			case "post":
				action = "created";
				break;
			case "put":
			case "patch":
				action = "updated";
				break;
			case "delete":
				action = "deleted";
				break;
			default:
				action = "client error";
		}

		if (params.multiple) {
			schema = StringHelper.capitalizeFirstLetter(subject.toLowerCase());
		} else {
			schema = StringHelper.capitalizeFirstLetter(
				StringHelper.removeLastS(subject.toLowerCase()),
			);
		}

		const message = params.message || `${schema} ${action} successfully`;

		let loggerMessage = `[${success ? "SUCCESS" : "ERROR"}] ${subject.toUpperCase()} > (${params.path || params.req.url} => status : ${params.status}, message: ${params.error || message})`;

		if (success) {
			logger.log(loggerMessage);
		} else {
			logger.error(loggerMessage);

			if (params.errorDatas)
				console.error("[ERROR_DATAS] :", params.errorDatas);
		}

		const responseJson = {
			status: params.status,
			success,
		};

		if (success && params.data) {
			responseJson["data"] = params.data;
		}

		if (success) {
			responseJson["message"] = message;
		} else if (!success && params.error) {
			responseJson["error"] = params.error;
		}

		if (params.fieldsErrors) {
			responseJson["fieldsErrors"] = params.fieldsErrors;
		}

		return params.res.status(params.status).json(responseJson);
	}

	/**
	 * Retrieves the corresponding status text for an HTTP status code.
	 *
	 * @param {number} statusCode - The HTTP status code.
	 * @returns {string | undefined} - The associated status text, or `undefined` if not found.
	 */
	public static getStatusText(statusCode: number): string | undefined {
		const statusText = Object.keys(HttpStatus).find(
			(key) => HttpStatus[key] === statusCode,
		);
		return statusText.replace("_", " ");
	}
}
