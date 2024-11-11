import { DISABLED_ROUTE } from "@decorators/disabled-route.decorator";
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class DisableRouteGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const isDisabled = this.reflector.get<boolean>(
			DISABLED_ROUTE,
			context.getHandler(),
		);

		if (isDisabled) {
			throw new ForbiddenException("NOT FOUND");
		}
		return true;
	}
}
