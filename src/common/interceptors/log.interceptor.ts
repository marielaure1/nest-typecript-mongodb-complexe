import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LogsHelper } from "@modules/logs/helpers/logs.helper";

/**
 * Interceptor for logging HTTP requests and responses.
 * Captures request details, response times, and logs both successful and failed requests.
 */
@Injectable()
export class LogInterceptor implements NestInterceptor {
	/**
	 * Creates an instance of LogInterceptor.
	 *
	 * @param {LogsHelper} logsHelper - The helper service for logging request details.
	 */
	constructor(private readonly logsHelper: LogsHelper) {}

	/**
	 * Intercepts incoming requests and logs request and response details.
	 *
	 * @param {ExecutionContext} context - The execution context containing the request and response.
	 * @param {CallHandler} next - The handler for processing the request.
	 * @returns {Observable<any>} - The observable stream of the request handling process.
	 */
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();
		const response = context.switchToHttp().getResponse();
		const method = request.method;
		const url = request.url;
		const ip = request.ip;
		const userId = request.user ? request.user.id : null;
		const email = request.user ? request.user.email : null;
		const traceId = request.headers["x-trace-id"] || "no-trace-id";
		const requestId = request.headers["x-request-id"] || "no-request-id";

		const start = Date.now();

		return next.handle().pipe(
			tap({
				next: (data) => {
					// Log successful requests
					const responseTime = Date.now() - start;
					this.logsHelper.logInfo({
						req: request,
						ip,
						userId,
						email,
						message: `${method} ${url} ${response.statusCode} - ${responseTime}ms`,
						context: "LoggingInterceptor",
						metadata: {
							traceId,
							requestId,
							responseTime,
							statusCode: response.statusCode,
						},
					});
				},
				error: (error) => {
					// Log errors
					const responseTime = Date.now() - start;
					this.logsHelper.logError({
						req: request,
						ip,
						userId,
						email,
						message: `${method} ${url} ${response.statusCode} - ${responseTime}ms - Error: ${error.message}`,
						context: "LoggingInterceptor",
						metadata: {
							traceId,
							requestId,
							responseTime,
							statusCode: response.statusCode,
							error: error.message,
						},
					});
				},
			}),
		);
	}
}
