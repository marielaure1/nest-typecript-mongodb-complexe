import { Controller } from "@nestjs/common";
import { PlanPricesService } from "@modules/plan-prices/plan-prices.service";
import { CreatePlanPriceDto } from "@modules/plan-prices/dto/create-plan-price.dto";
import { UpdatePlanPriceDto } from "@modules/plan-prices/dto/update-plan-price.dto";
import { PlanPriceDocument } from "@modules/plan-prices/entities/plan-price.entity";
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

@ApiTags("plan-prices")
@Controller("plan-prices")
export class PlanPricesController extends AppController<
	PlanPriceDocument,
	CreatePlanPriceDto,
	UpdatePlanPriceDto
> {
	constructor(
		private readonly planPricesService: PlanPricesService,
		logHelper: LogHelper,
		connection: Connection,
	) {
		super(planPricesService, "planPrices", connection, logHelper);
	}
}
