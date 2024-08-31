import { Module, MiddlewareConsumer, Global } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { BookerEmployeesController } from "@modules/booker-employees/booker-employees.controller";
import { BookerEmployeesService } from "@modules/booker-employees/booker-employees.service";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { LogsService } from "@modules/logs/logs.service";
import { LogHelper } from "@modules/logs/helpers/log.helper";

@Global()
@Module({
	imports: [],
	controllers: [BookerEmployeesController],
	providers: [
		BookerEmployeesService,
		MailService,
		MailHelper,
		LogsService,
		LogHelper,
	],
	exports: [BookerEmployeesModule, BookerEmployeesService],
})
export class BookerEmployeesModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(BookerEmployeesController);
	}
}
