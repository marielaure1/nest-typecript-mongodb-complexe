// Base
import { Injectable, Logger } from "@nestjs/common";

// Dependencies
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Dtos
import { UpdateOptionDto } from "@modules/options/dto/update-option.dto";
import { UpdateOptionWebhookStripeDto } from "@modules/options/dto/update-option-webhook-stripe.dto";
import { CreateProductWebhookStripeDto } from "@providers/stripe/dto/create-product-webhook-stripe.dto";

// Entities
import {
	Option,
	OptionDocument,
} from "@modules/options/entities/option.entity";

// Services
import { AppService } from "@src/app.service";

@Injectable()
export class OptionsService extends AppService<
	OptionDocument,
	CreateProductWebhookStripeDto,
	UpdateOptionDto | UpdateOptionWebhookStripeDto
> {
	private readonly logger = new Logger(OptionsService.name);

	constructor(
		@InjectModel(Option.name) private optionsModel: Model<OptionDocument>,
	) {
		super(optionsModel);
	}
}
