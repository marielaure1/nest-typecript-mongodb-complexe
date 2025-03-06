import { Body, Controller, Post } from "@nestjs/common";
import { SubscriptionsService } from "@modules/subscriptions/subscriptions.service";
import { CreateSubscriptionDto } from "@modules/subscriptions/dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "@modules/subscriptions/dto/update-subscription.dto";
import { SubscriptionDocument } from "@modules/subscriptions/entities/subscription.entity";
import { AppController } from "@src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import type { Response, Request } from "express";

import { Connection } from "mongoose";
import { LogsService } from "@modules/logs/logs.service";

@ApiTags("subscriptions")
@Controller("subscriptions")
export class SubscriptionsController extends AppController<
	SubscriptionDocument,
	CreateSubscriptionDto,
	UpdateSubscriptionDto
> {
	constructor(
		private readonly subscriptionsService: SubscriptionsService,
		connection: Connection,
	) {
		super(subscriptionsService, "subscriptions", connection);
	}

	@Post()
	async subscribe(@Body() createSubscriptionDto: CreateSubscriptionDto) {}

	// TODO: s'abonner
	// found all
	// found one
	// TODO: changer moyen de pâiement
	// TODO: changer de plan
	// TODO: se desabonner
}
