import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { settings } from "@constants/settings";
import { CONFIG } from "@config/config";

interface MailProps {
	to: string[];
	sender?: string;
	subject: string;
	template?: string;
	templateDatas?: object;
	attachments?: any[];
}

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	public async sendMail(params: MailProps) {
		if (CONFIG.email.sendEmail === true) {
			const mailOptions = {
				from: settings.MAIL_USER,
				to: params.to,
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
