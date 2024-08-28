import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { PromoCodesController } from "@modules/promo-codes/promo-codes.controller";
import { PromoCodesService } from "@modules/promo-codes/promo-codes.service";

@Module({
	imports: [],
	controllers: [PromoCodesController],
	providers: [PromoCodesService],
	exports: [],
})
export class PromoCodesModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(PromoCodesController);
	}
}
