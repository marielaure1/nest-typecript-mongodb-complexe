import { Module, MiddlewareConsumer, Global } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { ClientsService } from "@modules/clients/clients.service";
import { ClientsController } from "@modules/clients/clients.controller";
import { UsersService } from "@modules/users/users.service";
import { ClientsView } from "@modules/clients/views/clients.view";

@Global()
@Module({
	imports: [],
	controllers: [ClientsController],
	providers: [ClientsService, UsersService, ClientsView],
	exports: [ClientsModule, ClientsService, UsersService, ClientsView],
})
export class ClientsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(ClientsController);
	}
}
