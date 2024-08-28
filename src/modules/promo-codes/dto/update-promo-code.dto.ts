import { PartialType } from "@nestjs/swagger";
import { CreatePromoCodeDto } from "@modules/promo-codes/dto/create-promo-code.dto";

export class UpdatePromoCodeDto extends PartialType(CreatePromoCodeDto) {}
