import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { EmployeesController } from "@modules/employees/employees.controller";
import { EmployeesService } from "@modules/employees/employees.service";

@Module({
	imports: [],
	controllers: [EmployeesController],
	providers: [EmployeesService],
	exports: [],
})
export class EmployeesModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(EmployeesController);
	}
}
