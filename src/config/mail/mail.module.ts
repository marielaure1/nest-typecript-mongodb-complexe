import { Module, Global } from "@nestjs/common";
import settings from "@constants/settings";
import { MailerModule } from "@nestjs-modules/mailer";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Global()
@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: settings.MAILTRAP_HOST,
				port: Number(settings.MAILTRAP_PORT),
				auth: {
					user: settings.MAILTRAP_USER,
					pass: settings.MAILTRAP_PASS,
				},
			},
			defaults: {
				from: '"No Reply" <noreply@booker.com>',
			},
			template: {
				dir: join(__dirname, "../../services/mail/templates"),
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			},
		}),
	],
	exports: [MailerModule],
})
export class MailModule {}
