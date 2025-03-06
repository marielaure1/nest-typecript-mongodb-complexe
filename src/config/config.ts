import { configService } from "@constants/env";

export const CONFIG = {
	email: {
		sendEmail: true,
		testTransport: "email",
	},
	logs: {
		save: false,
	},
	infos: {
		company: {
			name: "Booker",
			website: "https://nom.com",
			emails: {
				contact: "",
				support: "",
				noReply: "no-reply@booker.com",
			},
		},
		api: {
			title: "API Booker",
			description: "Document OpenApi du logiciel Saas Booker",
			version: "1.0.0",
			tags: "Booker",
			prefix: "api",
		},
	},
	ipTracking: configService.get<string>("IP_TRACKING") || false,
};
