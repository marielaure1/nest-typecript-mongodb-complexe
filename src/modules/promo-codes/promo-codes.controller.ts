import { Controller } from "@nestjs/common";
import { PromoCodesService } from "@modules/promo-codes/promo-codes.service";
import { CreatePromoCodeDto } from "@modules/promo-codes/dto/create-promo-code.dto";
import { UpdatePromoCodeDto } from "@modules/promo-codes/dto/update-promo-code.dto";
import { PromoCodeDocument } from "@modules/promo-codes/entities/promo-code.entity";
import { AppController } from "src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { Response } from "express";
import { LogHelper } from "@modules/logs/helpers/log.helper";
import { log } from "console";
import { Connection } from "mongoose";

@ApiTags("promo-codes")
@Controller("promo-codes")
export class PromoCodesController extends AppController<
	PromoCodeDocument,
	CreatePromoCodeDto,
	UpdatePromoCodeDto
> {
	constructor(
		private readonly promoCodesService: PromoCodesService,
		logHelper: LogHelper,
		connection: Connection,
	) {
		super(promoCodesService, "promoCodes", connection, logHelper);
	}
}
