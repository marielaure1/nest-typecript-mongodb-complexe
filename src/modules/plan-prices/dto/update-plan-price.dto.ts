import { PartialType } from "@nestjs/swagger";
import { CreatePlanPriceDto } from "@modules/plan-prices/dto/create-plan-price.dto";

export class UpdatePlanPriceDto extends PartialType(CreatePlanPriceDto) {}
