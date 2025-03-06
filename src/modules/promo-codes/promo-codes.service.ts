import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePromoCodeDto } from "@modules/promo-codes/dto/create-promo-code.dto";
import { UpdatePromoCodeDto } from "@modules/promo-codes/dto/update-promo-code.dto";
import {
	PromoCode,
	PromoCodeDocument,
} from "@modules/promo-codes/entities/promo-code.entity";
import { AppService } from "@src/app.service";

@Injectable()
export class PromoCodesService extends AppService<
	PromoCodeDocument,
	CreatePromoCodeDto,
	CreatePromoCodeDto
> {
	constructor(
		@InjectModel(PromoCode.name)
		private promoCodesModel: Model<PromoCodeDocument>,
	) {
		super(promoCodesModel);
	}
}
