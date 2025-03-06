// Base
import {
	Global,
	MiddlewareConsumer,
	Module,
	RequestMethod,
} from "@nestjs/common";

// Controllerss
import { AuthController } from "@modules/auth/controllers/auth.controller";
import { AuthGoogleController } from "@modules/auth/controllers/auth-google.controller";
import { AuthManageController } from "@modules/auth/controllers/auth-manage.controller";
// import { AuthAppleController } from "@modules/auth/auth-apple.controller";

// Services
import { UsersService } from "@modules/users/users.service";
import { ClientsService } from "@modules/clients/clients.service";
import { StaffsService } from "@modules/staffs/staffs.service";
import { OrganizationsService } from "@modules/organizations/organizations.service";
import { AuthService } from "@modules/auth/services/auth.service";
import { GoogleAuthService } from "@providers/google/google.service";
import { RefreshTokenService } from "./services/refresh-token.service";

// Helpers
import { LogsHelper } from "@modules/logs/helpers/logs.helper";
import { ConfigModule } from "@nestjs/config";
import { EmployeesService } from "@modules/employees/employees.service";
import { AuthMiddleware } from "@middlewares/auth.middleware";

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
	],
	controllers: [
		AuthController,
		// AuthAppleController,
		AuthGoogleController,
		AuthManageController,
	],
	providers: [
		RefreshTokenService,
		UsersService,
		AuthService,
		ClientsService,
		EmployeesService,
		StaffsService,
		OrganizationsService,
		GoogleAuthService,
		LogsHelper,
	],
	exports: [AuthService],
})
export class AuthModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes({
			path: "auth/refresh-tokens",
			method: RequestMethod.GET,
		});
	}
}
