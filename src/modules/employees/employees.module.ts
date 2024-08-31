import { Module, MiddlewareConsumer, Global } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { EmployeesController } from "@modules/employees/employees.controller";
import { EmployeesService } from "@modules/employees/employees.service";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { LogsService } from "@modules/logs/logs.service";
import { LogHelper } from "@modules/logs/helpers/log.helper";

@Global()
@Module({
	imports: [],
	controllers: [EmployeesController],
	providers: [
		EmployeesService,
		MailService,
		MailHelper,
		LogsService,
		LogHelper,
	],
	exports: [EmployeesModule, EmployeesService],
})
export class EmployeesModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(EmployeesController);
	}
}
