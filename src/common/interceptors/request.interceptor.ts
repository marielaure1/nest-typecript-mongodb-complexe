import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { CryptoHelper } from "@helpers/crypto.helper";

@Injectable()
export class RequestInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();

		request.requestId =
			request.headers["x-request-id"] || CryptoHelper.generateRequestId();
		request.traceId =
			request.headers["x-trace-id"] || CryptoHelper.generateTraceId();

		return next.handle();
	}
}
