import { StringHelper } from "@helpers/string.helper";
import { FastifyReply } from "fastify";
import { NumberHelper } from "@helpers/number.helper";
import { HttpStatus } from "@nestjs/common";
// import { LoggerService } from "@providers/logger/logger.service";

interface ResponsesProps {
	res: FastifyReply;
	path: string;
	method: string;
	code: number;
	subject: string;
	data?: object;
	error?: object | string;
	message?: string;
	multiple?: boolean;
}

export class Responses {

	public static getResponse(params: ResponsesProps): object {
		// let loggerService: LoggerService;
		let success: boolean = false;
		let codeMessage: string;
		let action: string;
		let schema: string;

		if (NumberHelper.startsWith(params.code, 2)) {
			success = true;
			codeMessage = "success";
		} else {
			success = false;
			codeMessage =
				this.getStatusText(params.code).toLowerCase() || "error";
		}

		switch (params.method.toLowerCase()) {
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
			schema = StringHelper.capitalizeFirstLetter(
				params.subject.toLowerCase(),
			);
		} else {
			schema = StringHelper.capitalizeFirstLetter(
				StringHelper.removeLastS(params.subject.toLowerCase()),
			);
		}

		const message =
			params.message ||
			(success
				? `${schema} ${action} successfully`
				: `${schema} ${codeMessage}`);

		// if (success) {
		// 	loggerService.log(
		// 		`[Success] ${params.subject.toUpperCase()} > (${params.path} => code : ${params.code}, message: ${message})`,
		// 	);
		// } else {
		// 	loggerService.error(
		// 		`[Error] ${params.subject.toUpperCase()} > (${params.path} => code : ${params.code}, message: ${message})`,
		// 	);
		// }
		console.log(
			`[${success ? "Success" : "Error"}] ${params.subject.toUpperCase()} > (${params.path} => code : ${params.code}, message: ${message})`,
		);

		const responseJson = {
			code: params.code,
			success,
			message,
		};

		if (success && params.data) {
			responseJson["data"] = params.data;
		} else if (!success && params.error) {
			responseJson["error"] = params.error;
		}

		return params.res.status(params.code).send(responseJson);
	}

	public static getStatusText(statusCode: number): string | undefined {
		const statusText = Object.keys(HttpStatus).find(
			(key) => HttpStatus[key] === statusCode,
		);
		return statusText.replace("_", " ");
	}
}
