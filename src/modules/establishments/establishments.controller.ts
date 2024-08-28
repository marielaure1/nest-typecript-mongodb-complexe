import { Controller } from "@nestjs/common";
import { EstablishmentsService } from "@modules/establishments/establishments.service";
import { CreateEstablishmentDto } from "@modules/establishments/dto/create-establishment.dto";
import { UpdateEstablishmentDto } from "@modules/establishments/dto/update-establishment.dto";
import { EstablishmentDocument } from "@modules/establishments/entities/establishment.entity";
import { AppController } from "src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("establishments")
@Controller("establishments")
export class EstablishmentsController extends AppController<
	EstablishmentDocument,
	CreateEstablishmentDto,
	UpdateEstablishmentDto
> {
	constructor(private readonly establishmentsService: EstablishmentsService) {
		super(establishmentsService, "establishments");
	}
}
