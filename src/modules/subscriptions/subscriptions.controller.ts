import { Controller } from "@nestjs/common";
import { SubscriptionsService } from "@modules/subscriptions/subscriptions.service";
import { CreateSubscriptionDto } from "@modules/subscriptions/dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "@modules/subscriptions/dto/update-subscription.dto";
import { SubscriptionDocument } from "@modules/subscriptions/entities/subscription.entity";
import { AppController } from "src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { Response } from "express";
import { LogHelper } from "@modules/logs/helpers/log.helper";
import { Connection } from "mongoose";

@ApiTags("subscriptions")
@Controller("subscriptions")
export class SubscriptionsController extends AppController<
	SubscriptionDocument,
	CreateSubscriptionDto,
	UpdateSubscriptionDto
> {
	constructor(
		private readonly subscriptionsService: SubscriptionsService,
		logHelper: LogHelper,
		connection: Connection,
	) {
		super(subscriptionsService, "subscriptions", connection, logHelper);
	}
}
