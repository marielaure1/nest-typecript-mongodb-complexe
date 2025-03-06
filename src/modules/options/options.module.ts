import { Module } from "@nestjs/common";
import { OptionsController } from "@modules/options/options.controller";
import { OptionsService } from "@modules/options/options.service";
import { UserHelper } from "@modules/users/helpers/user.helper";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { MailService } from "@providers/mail/mail.service";
import { OptionFeaturesService } from "@modules/option-features/option-features.service";
import { PlanOptionFeaturesService } from "@modules/plan-option-features/plan-option-features.service";

@Module({
	imports: [],
	controllers: [OptionsController],
	providers: [
		OptionsService,
		OptionFeaturesService,
		PlanOptionFeaturesService,
		MailService,
		MailHelper,
		UserHelper,
	],
	exports: [OptionsService, OptionsModule],
})
export class OptionsModule {}
