import { PartialType } from "@nestjs/swagger";
import { CreateEstablishmentDto } from "@modules/establishments/dto/create-establishment.dto";

export class UpdateEstablishmentDto extends PartialType(
	CreateEstablishmentDto,
) {}
