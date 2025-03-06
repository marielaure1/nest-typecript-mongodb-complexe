// Base
import { Controller, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

// Interceptors
import { LogInterceptor } from "@interceptors/log.interceptor";
/**
 * Controller for handling authentication-related apple operations.
 */
@ApiTags("auth")
@Controller("auth/apple")
@UseInterceptors(LogInterceptor)
export class AuthAppleController {
	constructor() {}
}
