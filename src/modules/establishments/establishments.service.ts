import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateEstablishmentDto } from "@modules/establishments/dto/create-establishment.dto";
import { UpdateEstablishmentDto } from "@modules/establishments/dto/update-establishment.dto";
import {
	Establishment,
	EstablishmentDocument,
} from "@modules/establishments/entities/establishment.entity";
import { AppService } from "src/app.service";

@Injectable()
export class EstablishmentsService extends AppService<
	EstablishmentDocument,
	CreateEstablishmentDto,
	CreateEstablishmentDto
> {
	constructor(
		@InjectModel(Establishment.name)
		private establishmentsModel: Model<EstablishmentDocument>,
	) {
		super(establishmentsModel);
	}
}
