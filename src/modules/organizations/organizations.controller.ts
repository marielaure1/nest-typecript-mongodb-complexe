import { Controller } from "@nestjs/common";
import { OrganizationsService } from "@modules/organizations/organizations.service";
import { CreateOrganizationDto } from "@modules/organizations/dto/create-organization.dto";
import { UpdateOrganizationDto } from "@modules/organizations/dto/update-organization.dto";
import { OrganizationDocument } from "@modules/organizations/entities/organization.entity";
import { AppController } from "src/app.controller";
import { ApiTags } from "@nestjs/swagger";
import { Connection } from "mongoose";

@ApiTags("organizations")
@Controller("organizations")
export class OrganizationsController extends AppController<
	OrganizationDocument,
	CreateOrganizationDto,
	UpdateOrganizationDto
> {
	constructor(
		private readonly organizationsService: OrganizationsService,
		connection: Connection,
	) {
		super(organizationsService, "organizations", connection);
	}
}
