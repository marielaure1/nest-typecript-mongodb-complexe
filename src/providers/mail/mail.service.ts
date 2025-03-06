import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { CONFIG } from "@config/config";
import { configService } from "@constants/env";
import { NodeEnvEnum } from "@enums/configs/node-env.enum";

/**
 * Interface defining the properties for sending an email.
 */
interface MailProps {
	/** List of recipient email addresses. */
	to: string[];
	/** Optional sender email address. */
	sender?: string;
	/** Subject of the email. */
	subject: string;
	/** Optional path to the email template. */
	template?: string;
	/** Optional data to be injected into the email template. */
	templateDatas?: object;
	/** Optional list of attachments for the email. */
	attachments?: any[];
}

/**
 * Service for sending emails using `@nestjs-modules/mailer`.
 */
@Injectable()
export class MailService {
	/**
	 * Initializes the MailService.
	 *
	 * @param {MailerService} mailerService - The mailer service used for sending emails.
	 */
	constructor(private readonly mailerService: MailerService) {}

	/**
	 * Sends an email based on the provided parameters.
	 *
	 * @param {MailProps} params - The email details including recipients, subject, template, and attachments.
	 * @returns {Promise<any>} - The result of the email sending process, or `false` if email sending is disabled.
	 */
	public async sendMail(params: MailProps) {
		if (CONFIG.email.sendEmail === true) {
			const mailOptions = {
				to:
					configService.get<string>("MODE") != NodeEnvEnum.PROD &&
					["email", null].includes(
						configService.get<string>("MAILER_TESTS_TRANSPORT"),
					)
						? configService.get<string>("MAILER_TO")
						: params.to,
				from:
					configService.get<string>("MAILER_TESTS_TRANSPORT") ==
					"email"
						? configService.get<string>("MAILER_FROM")
						: params.sender,
				subject: params.subject,
				template: params.template,
				context: params.templateDatas,
			};

			// if(params.attachments) {
			//     mailOptions["attachments"] = params.attachments;
			// }

			const mailer = await this.mailerService.sendMail(mailOptions);

			return mailer;
		}

		return false;
	}
}
