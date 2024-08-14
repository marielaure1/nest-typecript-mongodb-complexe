import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { ClientsService } from "@modules/clients/clients.service";
import { ClientsController } from "@modules/clients/clients.controller";
// import { UsersService } from "@modules/users/users.service";
// import { UsersModule } from "@modules/users/users.module";
// import { CustomersService } from "@modules/customers/customers.service";
// import { CustomersModule } from "@modules/customers/customers.module";
// import { CustomFieldsService } from "@modules/custom-fields/custom-fields.service";
// import { CustomFieldsModule } from "@modules/custom-fields/custom-fields.module";

@Module({
	imports: [],
	controllers: [ClientsController],
	providers: [ClientsService],
	exports: [ClientsModule],
})
export class ClientsModule {
	// configure(consumer: MiddlewareConsumer) {
	// 	consumer.apply(AuthMiddleware).forRoutes(ClientsController);
	// }
}
