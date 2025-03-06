import { Module, Global } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailHelper } from "@src/providers/mail/helpers/mail.helper";
import { MailService } from "@src/providers/mail/mail.service";
import { configService } from "@constants/env";
import { CONFIG } from "@config/config";
import { NodeEnvEnum } from "@enums/configs/node-env.enum";
import { ConfigService } from "@nestjs/config";

function getMailTransportConfig(configService: ConfigService) {
	const isDevEnv =
		configService.get<string>("MODE") !== NodeEnvEnum.PROD &&
		configService.get<string>("MAILER_TESTS_TRANSPORT") === "mailtrap";

	return {
		host: configService.get<string>(
			isDevEnv ? "MAILTRAP_HOST" : "MAILER_HOST",
		),
		port: configService.get<number>(
			isDevEnv ? "MAILTRAP_PORT" : "MAILER_PORT",
		),
		auth: {
			user: configService.get<string>(
				isDevEnv ? "MAILTRAP_USER" : "MAILER_USER",
			),
			pass: configService.get<string>(
				isDevEnv ? "MAILTRAP_PASS" : "MAILER_PASS",
			),
		},
		secure: false,
		tls: { rejectUnauthorized: false },
	};
}

@Global()
@Module({
	imports: [
		MailerModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				transport: getMailTransportConfig(configService),
				defaults: {
					from: `"Booker" <${
						configService.get<string>("MAILER_TESTS_TRANSPORT") ===
						"email"
							? configService.get<string>("MAILER_FROM")
							: CONFIG.infos.company.emails.noReply
					}>`,
				},
				template: {
					dir: join(__dirname, "../../../views/mails"),
					adapter: new HandlebarsAdapter(),
					options: { strict: true },
				},
			}),
		}),
	],
	providers: [MailService, MailHelper],
	exports: [MailService, MailHelper],
})
export class MailModule {}
