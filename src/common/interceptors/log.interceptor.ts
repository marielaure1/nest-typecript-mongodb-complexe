import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LogsHelper } from "@modules/logs/helpers/logs.helper";
import { LogLevelEnum } from "@modules/logs/enums/log-level.enum";

@Injectable()
export class LogInterceptor implements NestInterceptor {
	constructor(private readonly logsHelper: LogsHelper) {}

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
