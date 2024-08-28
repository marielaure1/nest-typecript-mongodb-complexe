import { PartialType } from "@nestjs/swagger";
import { CreatePlanDto } from "@modules/plans/dto/create-plan.dto";

export class UpdatePlanDto extends PartialType(CreatePlanDto) {}
