import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { CryptoHelper } from "@helpers/crypto.helper";

/**
 * Interceptor for enhancing incoming requests with request and trace IDs.
 * If the headers do not contain `x-request-id` or `x-trace-id`, it generates new ones.
 */
@Injectable()
export class RequestInterceptor implements NestInterceptor {
	/**
	 * Intercepts incoming requests to attach a unique request ID and trace ID.
	 *
	 * @param {ExecutionContext} context - The execution context containing the request.
	 * @param {CallHandler} next - The handler for processing the request.
	 * @returns {Observable<any>} - The observable stream of the request handling process.
	 */
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();

		request.requestId =
			request.headers["x-request-id"] || CryptoHelper.generateRequestId();
		request.traceId =
			request.headers["x-trace-id"] || CryptoHelper.generateTraceId();

		return next.handle();
	}
}
