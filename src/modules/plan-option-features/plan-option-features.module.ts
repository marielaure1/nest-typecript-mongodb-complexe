import { Module } from "@nestjs/common";
import { PlanOptionFeaturesController } from "@modules/plan-option-features/plan-option-features.controller";
import { PlanOptionFeaturesService } from "@modules/plan-option-features/plan-option-features.service";
import { UserHelper } from "@modules/users/helpers/user.helper";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { MailService } from "@providers/mail/mail.service";

@Module({
	imports: [],
	controllers: [PlanOptionFeaturesController],
	providers: [PlanOptionFeaturesService, MailService, MailHelper, UserHelper],
	exports: [PlanOptionFeaturesService, PlanOptionFeaturesModule],
})
export class PlanOptionFeaturesModule {}
