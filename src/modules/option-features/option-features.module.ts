import { Module } from "@nestjs/common";
import { OptionFeaturesController } from "@modules/option-features/option-features.controller";
import { OptionFeaturesService } from "@modules/option-features/option-features.service";
import { UserHelper } from "@modules/users/helpers/user.helper";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { MailService } from "@providers/mail/mail.service";

@Module({
	imports: [],
	controllers: [OptionFeaturesController],
	providers: [OptionFeaturesService, MailService, MailHelper, UserHelper],
	exports: [OptionFeaturesService, OptionFeaturesModule],
})
export class OptionFeaturesModule {}
