import { Module, Global } from "@nestjs/common";
import { settings } from "@constants/settings";
import { MailerModule } from "@nestjs-modules/mailer";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailHelper } from "@src/providers/mail/helpers/mail.helper";
import { MailService } from "@src/providers/mail/mail.service";

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
				from: '"No Reply" <noreply@NOM.com>',
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
	providers: [MailService, MailHelper],
	exports: [MailerModule],
})
export class MailModule {}
