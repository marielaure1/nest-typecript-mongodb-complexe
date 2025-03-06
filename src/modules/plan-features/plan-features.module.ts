import { Module } from "@nestjs/common";
import { PlanFeaturesController } from "@modules/plan-features/plan-features.controller";
import { PlanFeaturesService } from "@modules/plan-features/plan-features.service";
import { UserHelper } from "@modules/users/helpers/user.helper";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { MailService } from "@providers/mail/mail.service";

@Module({
	imports: [],
	controllers: [PlanFeaturesController],
	providers: [PlanFeaturesService, MailService, MailHelper, UserHelper],
	exports: [PlanFeaturesService, PlanFeaturesModule],
})
export class PlanFeaturesModule {}
