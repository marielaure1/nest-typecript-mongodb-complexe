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
import { LogHelper } from "@modules/logs/helpers/log.helper";
import { Connection } from "mongoose";

@ApiTags("establishments")
@Controller("establishments")
export class EstablishmentsController extends AppController<
	EstablishmentDocument,
	CreateEstablishmentDto,
	UpdateEstablishmentDto
> {
	constructor(
		private readonly establishmentsService: EstablishmentsService,
		logHelper: LogHelper,
		connection: Connection,
	) {
		super(establishmentsService, "establishments", connection, logHelper);
	}
}
