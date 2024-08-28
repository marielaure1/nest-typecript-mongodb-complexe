import { Controller } from "@nestjs/common";
import { OrganizationsService } from "@modules/organizations/organizations.service";
import { CreateOrganizationDto } from "@modules/organizations/dto/create-organization.dto";
import { UpdateOrganizationDto } from "@modules/organizations/dto/update-organization.dto";
import { OrganizationDocument } from "@modules/organizations/entities/organization.entity";
import { AppController } from "src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("organizations")
@Controller("organizations")
export class OrganizationsController extends AppController<
	OrganizationDocument,
	CreateOrganizationDto,
	UpdateOrganizationDto
> {
	constructor(private readonly organizationsService: OrganizationsService) {
		super(organizationsService, "organizations");
	}
}
