import { Response } from "express";

interface ResponsesProps {
	res: Response;
	path: string;
	method: string;
	code: number;
	subject: string;
	data?: object;
	error?: object | string;
	message?: string;
}

export class Responses {
	public static getResponse(params: ResponsesProps): object {
		let success: boolean = false;
		let codeMessage: string;
		let action: string;

		if (params.code === 200 || params.code === 201) {
			success = true;
			codeMessage = "success";
		} else if (
			params.code.toString().startsWith("4") ||
			params.code.toString().startsWith("5")
		) {
			success = false;
			switch (params.code) {
				case 404:
					codeMessage = "not found";
					break;
				case 405:
					codeMessage = "method not allowed";
					break;
				case 409:
					codeMessage = "conflict";
					break;
				case 422:
					codeMessage = "unprocessable entity";
					break;
				case 500:
					codeMessage = "internal server error";
					break;
				default:
					codeMessage = "client error";
			}
		} else {
			codeMessage = "unknown error";
		}

		switch (params.method.toLowerCase()) {
			case "get":
				action = "retrieve";
				break;
			case "post":
				action = "create";
				break;
			case "put":
			case "patch":
				action = "update";
				break;
			case "delete":
				action = "delete";
				break;
			default:
				action = "client error";
		}

		const message =
			params.message ||
			(success
				? `${params.subject} ${action} with success`
				: `${params.subject} ${codeMessage}`);
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

		return params.res.status(params.code).json(responseJson);
	}
}
