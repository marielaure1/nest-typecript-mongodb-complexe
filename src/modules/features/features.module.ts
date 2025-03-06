import { Module } from "@nestjs/common";
import { FeaturesController } from "@modules/features/features.controller";
import { FeaturesService } from "@modules/features/features.service";
import { UserHelper } from "@modules/users/helpers/user.helper";
import { MailHelper } from "@providers/mail/helpers/mail.helper";
import { MailService } from "@providers/mail/mail.service";

@Module({
	imports: [],
	controllers: [FeaturesController],
	providers: [FeaturesService, MailService, MailHelper, UserHelper],
	exports: [FeaturesService, FeaturesModule],
})
export class FeaturesModule {}
