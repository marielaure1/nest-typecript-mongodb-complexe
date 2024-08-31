import { Module, MiddlewareConsumer, Global } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { ClientsService } from "@modules/clients/clients.service";
import { ClientsController } from "@modules/clients/clients.controller";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { LogsService } from "@modules/logs/logs.service";
import { LogHelper } from "@modules/logs/helpers/log.helper";
// import { UsersService } from "@modules/users/users.service";
// import { UsersModule } from "@modules/users/users.module";
// import { CustomersService } from "@modules/customers/customers.service";
// import { CustomersModule } from "@modules/customers/customers.module";
// import { CustomFieldsService } from "@modules/custom-fields/custom-fields.service";
// import { CustomFieldsModule } from "@modules/custom-fields/custom-fields.module";

@Global()
@Module({
	imports: [],
	controllers: [ClientsController],
	providers: [
		ClientsService,
		MailService,
		MailHelper,
		LogsService,
		LogHelper,
	],
	exports: [ClientsModule, ClientsService],
})
export class ClientsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(ClientsController);
	}
}
