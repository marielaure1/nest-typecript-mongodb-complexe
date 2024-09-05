import { Module, MiddlewareConsumer, Global } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { BookerEmployeesController } from "@modules/booker-employees/booker-employees.controller";
import { BookerEmployeesService } from "@modules/booker-employees/booker-employees.service";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";

@Global()
@Module({
	imports: [],
	controllers: [BookerEmployeesController],
	providers: [
		BookerEmployeesService,
		MailService,
		MailHelper,
	],
	exports: [BookerEmployeesModule, BookerEmployeesService],
})
export class BookerEmployeesModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(BookerEmployeesController);
	}
}
