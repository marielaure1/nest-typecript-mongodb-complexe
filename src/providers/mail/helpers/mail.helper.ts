import { Injectable } from "@nestjs/common";
import { CONFIG } from "@config/config";
import { configService } from "@constants/env";
import { MailService } from "@src/providers/mail/mail.service";

/**
 * Service helper for sending various authentication-related emails.
 */
@Injectable()
export class MailHelper {
	private readonly sender = CONFIG.infos.company.emails.noReply;

	/**
	 * Initializes the MailHelper service.
	 *
	 * @param {MailService} mailService - The mail service used for sending emails.
	 */
	constructor(private readonly mailService: MailService) {}

	// Account methods

	/**
	 * Sends an account confirmation email to a user.
	 *
	 * @param {ConfirmAccountUserProps} params - Email details and recipient information.
	 * @returns {Promise<any>} - The result of the email sending process.
	 */
	public async sendConfirmAccountUser(params: ConfirmAccountUserProps) {
		const sendEmail = await this.mailService.sendMail({
			to: params.to,
			sender: params.sender ?? this.sender,
			subject: `Welcome to ${CONFIG.infos.company.name}`,
			template: "./auth/confirmation-account-user",
			templateDatas: {
				// firstName: params.templateDatas.firstName,
				url: `${configService.get<string>("FRONTEND_URL")}/admin/auth/confirm-account?token=${params.templateDatas.token}`,
			},
		});

		return sendEmail;
	}

	/**
	 * Sends an account confirmation email to an organization.
	 * @experimental
	 * @param {ConfirmAccountOrganizationProps} params - Email details and recipient information.
	 * @returns {Promise<any>} - The result of the email sending process.
	 */
	public async sendConfirmAccountOrganization(
		params: ConfirmAccountOrganizationProps,
	) {
		const sendEmail = await this.mailService.sendMail({
			to: params.to,
			sender: params.sender ?? this.sender,
			subject: `Welcome to ${CONFIG.infos.company.name}`,
			template: "./auth/confirmation-organization",
			templateDatas: {
				organizationName: params.templateDatas.organizationName,
				userEmail: params.templateDatas.userEmail,
				url: `${configService.get<string>("FRONTEND_URL")}/auth/confirm?token=${params.templateDatas.token}`,
			},
		});

		return sendEmail;
	}

	/**
	 * @description Sends an account confirmation email to a staff.
	 * @experimental
	 * @param {ConfirmAccountStaffProps} params - Email details and recipient information.
	 * @returns {Promise<any>} - The result of the email sending process.
	 */
	public async sendConfirmAccountStaff(params: ConfirmAccountStaffProps) {
		const sendEmail = await this.mailService.sendMail({
			to: params.to,
			sender: params.sender ?? this.sender,
			subject: `Welcome to ${CONFIG.infos.company.name}`,
			template: "./auth/confirmation-staff",
			templateDatas: {
				firstName: params.templateDatas.firstName,
				url: `${configService.get<string>("FRONTEND_URL")}/admin/auth/confirm-account?token=${params.templateDatas.token}`,
			},
		});

		return sendEmail;
	}

	/**
	 * Sends a reset password email to the user.
	 *
	 * @param {ResetPasswordProps} params - Email details and recipient information.
	 * @returns {Promise<any>} - The result of the email sending process.
	 */
	public async sendResetPasswordEmail(params: ResetPasswordProps) {
		const sendEmail = await this.mailService.sendMail({
			to: params.to,
			sender: params.sender ?? this.sender,
			subject: "Reset your password",
			template: "./auth/reset-password",
			templateDatas: {
				url: `${configService.get<string>("FRONTEND_URL")}/admin/auth/reset-password?token=${params.templateDatas.token}`,
			},
		});

		return sendEmail;
	}

	/**
	 * Sends an initial password setup email to the user.
	 * @experimental
	 * @param {InitPasswordProps} params - Email details and recipient information.
	 * @returns {Promise<any>} - The result of the email sending process.
	 */
	public async sendInitPasswordEmail(params: InitPasswordProps) {
		const sendEmail = await this.mailService.sendMail({
			to: params.to,
			sender: params.sender ?? this.sender,
			subject: "Init your password",
			template: "./auth/init-password",
			templateDatas: {
				url: `${configService.get<string>("FRONTEND_URL")}/admin/auth/reset-password?token=${params.templateDatas.token}`,
			},
		});

		return sendEmail;
	}
}

/**
 * @description Base interface for email parameters.
 */
interface BaseProps {
	/** Recipient email addresses. */
	to: string[];
	/** Sender email address (optional). */
	sender?: string;
	/** Email subject (optional). */
	subject?: string;
	/** Email template data (optional). */
	templateDatas?: object;
}

// Account interfaces

/**
 * @description Interface for the `sendConfirmAccountUser` method.
 */
interface ConfirmAccountUserProps extends BaseProps {
	templateDatas?: {
		// firstName: string;
		token: string;
	};
}

/**
 * @description Interface for the `sendConfirmAccountOrganization` method.
 */
interface ConfirmAccountOrganizationProps extends BaseProps {
	templateDatas?: {
		organizationName: string;
		userEmail: string;
		token: string;
	};
}

/**
 * @description Interface for the `sendConfirmAccountStaff` method.
 */
interface ConfirmAccountStaffProps extends BaseProps {
	templateDatas?: {
		firstName: string;
		token: string;
	};
}

/**
 * @description Interface for the `sendResetPasswordEmail` method.
 */
interface ResetPasswordProps extends BaseProps {
	templateDatas?: {
		token: string;
	};
}

/**
 * @description Interface for the `sendInitPasswordEmail` method.
 */
interface InitPasswordProps extends BaseProps {
	templateDatas?: {
		token: string;
	};
}
