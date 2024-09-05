import { Module } from "@nestjs/common";
import { AuthController } from "@modules/auth/auth.controller";
import { UsersService } from "@modules/users/users.service";
import { ClientsService } from "@modules/clients/clients.service";
import { BookerEmployeesService } from "@modules/booker-employees/booker-employees.service";
import { OrganizationsService } from "@modules/organizations/organizations.service";
// import { LogsService } from "@modules/logs/logs.service";

@Module({
	imports: [],
	controllers: [AuthController],
	providers: [
		UsersService,
		ClientsService,
		BookerEmployeesService,
		OrganizationsService,
		// LogsService,
	],
})
export class AuthModule {}
