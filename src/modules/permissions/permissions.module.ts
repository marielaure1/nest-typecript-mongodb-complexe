import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { PermissionsController } from '@modules/permissions/permissions.controller';
import { PermissionsService } from '@modules/permissions/permissions.service';

@Module({
  imports: [],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsModule],
})
export class PermissionsModule {
  configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(PermissionsController);
	}
}
