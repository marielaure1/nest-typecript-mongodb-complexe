import { Module, MiddlewareConsumer, Global } from "@nestjs/common";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { StaffsController } from "@modules/staffs/staffs.controller";
import { StaffsService } from "@modules/staffs/staffs.service";
import { MailService } from "@providers/mail/mail.service";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "@modules/auth/auth.module";

@Global()
@Module({
	imports: [],
	controllers: [StaffsController],
	providers: [StaffsService, MailService, MailHelper],
	exports: [StaffsService],
})
export class StaffsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(StaffsController);
	}
}
