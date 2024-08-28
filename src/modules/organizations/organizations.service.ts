import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateOrganizationDto } from "@modules/organizations/dto/create-organization.dto";
import { UpdateOrganizationDto } from "@modules/organizations/dto/update-organization.dto";
import {
	Organization,
	OrganizationDocument,
} from "@modules/organizations/entities/organization.entity";
import { AppService } from "src/app.service";

@Injectable()
export class OrganizationsService extends AppService<
	OrganizationDocument,
	CreateOrganizationDto,
	CreateOrganizationDto
> {
	constructor(
		@InjectModel(Organization.name)
		private organizationsModel: Model<OrganizationDocument>,
	) {
		super(organizationsModel);
	}
}
