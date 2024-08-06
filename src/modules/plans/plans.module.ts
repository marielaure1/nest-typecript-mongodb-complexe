import { MiddlewareConsumer, Module } from "@nestjs/common";
import { PlansService } from "@modules/plans/plans.service";
import { PlansController } from "@modules/plans/plans.controller";
import { DatabaseModule } from "@config/database/mongoose/mongoose.module";
import { StripeModule } from "@providers/services/stripe/stripe.module";
import { PlansStripeService } from "@providers/services/stripe/services/plans.stripe.service";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { CustomersModule } from "@modules/customers/customers.module";
import { UsersModule } from "@modules/users/users.module";
import { UsersService } from "@modules/users/users.service";
import { CustomersService } from "@modules/customers/customers.service";

@Module({
	imports: [DatabaseModule, StripeModule, CustomersModule, UsersModule],
	controllers: [PlansController],
	providers: [
		PlansService,
		PlansStripeService,
		UsersService,
		CustomersService,
	],
})
export class PlansModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(PlansController);
	}
}
