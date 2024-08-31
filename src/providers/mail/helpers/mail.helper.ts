import { Injectable } from "@nestjs/common";
import { MailService } from "@src/providers/mail/mail.service";
import { settings } from "@constants/settings";

@Injectable()
export class MailHelper {
	private readonly sender = "no-reply@NOM.com";

	constructor(private readonly mailService: MailService) {}

	// Account methods

	/**
	 * @description : This method sends a confirmation email to the client
	 * @param params : ConfirmAccountProps
	 */
	public async sendConfirmAccountClient(params: ConfirmAccountClientProps) {
		const sendEmail = await this.mailService.sendMail({
			to: params.to,
			sender: params.sender ?? this.sender,
			subject: "Welcome to NOM",
			template: "./confirmation",
			templateDatas: {
				firstName: params.templateDatas.firstName,
				url: `${settings.FRONTEND_URL}auth/confirm/${params.templateDatas.token}`,
			},
		});

		return sendEmail;
	}

	/**
	 * @description : This method sends a confirmation email to the client
	 * @param params : ConfirmAccountProps
	 */
	public async sendConfirmAccountOrganization(
		params: ConfirmAccountOrganizationProps,
	) {
		const sendEmail = await this.mailService.sendMail({
			to: params.to,
			sender: params.sender ?? this.sender,
			subject: "Welcome to NOM",
			template: "./confirmation",
			templateDatas: {
				organizationName: params.templateDatas.organizationName,
				userEmail: params.templateDatas.userEmail,
				url: `${settings.FRONTEND_URL}auth/confirm/${params.templateDatas.token}`,
			},
		});

		return sendEmail;
	}

	public async sendResetPasswordEmail(params: ResetPasswordProps) {
		const sendEmail = await this.mailService.sendMail({
			to: params.to,
			sender: params.sender ?? this.sender,
			subject: "Reset your password",
			template: "./reset-password",
			templateDatas: {
				url: `${settings.FRONTEND_URL}auth/reset-password/${params.templateDatas.token}`,
			},
		});

		return sendEmail;
	}

	public async sendInitPasswordEmail(params: InitPasswordProps) {
		const sendEmail = await this.mailService.sendMail({
			to: params.to,
			sender: params.sender ?? this.sender,
			subject: "Init your password",
			template: "./init-password",
			templateDatas: {
				url: `${settings.FRONTEND_URL}auth/init-password/${params.templateDatas.token}`,
			},
		});

		return sendEmail;
	}
}

interface BaseProps {
	to: string[];
	sender?: string;
	subject?: string;
	templateDatas?: object;
}

// Account interfaces

/**
 * @description : This is the interface for the sendConfirmAccountClient method
 */
interface ConfirmAccountClientProps extends BaseProps {
	templateDatas?: {
		firstName: string;
		token: string;
	};
}

/**
 * @description : This is the interface for the sendConfirmAccountOrganization method
 */
interface ConfirmAccountOrganizationProps extends BaseProps {
	templateDatas?: {
		organizationName: string;
		userEmail: string;
		token: string;
	};
}

/**
 * @description : This is the interface for the sendResetPasswordEmail method
 */
interface ResetPasswordProps extends BaseProps {
	templateDatas?: {
		token: string;
	};
}

/**
 * @description : This is the interface for the sendResetPasswordEmail method
 */
interface InitPasswordProps extends BaseProps {
	templateDatas?: {
		token: string;
	};
}
