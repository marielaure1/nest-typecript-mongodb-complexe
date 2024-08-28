import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePlanPriceDto } from "@modules/plan-prices/dto/create-plan-price.dto";
import { UpdatePlanPriceDto } from "@modules/plan-prices/dto/update-plan-price.dto";
import { PlanPrice, PlanPriceDocument } from "@modules/plan-prices/entities/plan-price.entity";
import { AppService } from "src/app.service";

@Injectable()
export class PlanPricesService extends AppService<
	PlanPriceDocument,
	CreatePlanPriceDto,
	UpdatePlanPriceDto
> {
	constructor(
		@InjectModel(PlanPrice.name) private planPricesModel: Model<PlanPriceDocument>,
) {
		super(planPricesModel);
}
}
