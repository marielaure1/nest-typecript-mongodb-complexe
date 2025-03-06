import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Ip,
	Param,
	Post,
	Req,
	Res,
} from "@nestjs/common";
import { OrganizationsService } from "@modules/organizations/organizations.service";
import { CreateOrganizationDto } from "@modules/organizations/dto/create-organization.dto";
import { UpdateOrganizationDto } from "@modules/organizations/dto/update-organization.dto";
import { OrganizationDocument } from "@modules/organizations/entities/organization.entity";
import { AppController } from "@src/app.controller";
import { ApiTags } from "@nestjs/swagger";
import { Connection } from "mongoose";
import { Response, Request } from "express";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import { Responses } from "@helpers/responses.helper";
import { OrganizationStatusEnum } from "@enums/companies/organization-status.enum";
import { AuthGuard } from "@guards/auth.guard";

@ApiTags("organizations")
@Controller("organizations")
export class OrganizationsController extends AppController<
	OrganizationDocument,
	CreateOrganizationDto,
	UpdateOrganizationDto
> {
	private readonly configService: ConfigService;

	constructor(
		private readonly organizationsService: OrganizationsService,
		connection: Connection,
	) {
		super(organizationsService, "organizations", connection);
	}

	// 	@ApiOperation({ summary: "Create a new user" })
	// @ApiResponse({
	// 	status: 201,
	// 	description: "The user has been successfully created.",
	// })
	// @ApiResponse({ status: 400, description: "Bad Request." })
	// @ApiBearerAuth()
	// employee
	// @Ownership()
	// @Roles(RoleEnum.ADMIN)
	// @UseGuards(AuthGuard)
	@Post()
	async create(
		@Body() createOrganizationDto: CreateOrganizationDto,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		try {
			const userInfos = res["userInfos"];

			createOrganizationDto.ownerId = userInfos.user._id.toString();
			let sirenVerication = false;

			try {
				sirenVerication = await axios.get(
					`https://api.insee.fr/api-sirene/3.11/siren/${createOrganizationDto.siren}`,
					{
						headers: {
							"X-INSEE-Api-Key-Integration": `14b1f03b-9cfa-4c21-b1f0-3b9cfa1c2146`,
						},
					},
				);
			} catch (error) {}

			if (sirenVerication) {
				createOrganizationDto.isVerified = true;
				createOrganizationDto.verificationStatus =
					OrganizationStatusEnum.VERIFIED;
			} else {
				createOrganizationDto.isVerified = false;
				createOrganizationDto.verificationStatus =
					OrganizationStatusEnum.PENDING;
				// TODO: notification staffe for verfication update isVerified and verificationStatus
			}

			return super.create(createOrganizationDto, res, req, ip);
		} catch (error) {
			console.error("ORGANISATION", error);

			return Responses.getResponse({
				req,
				res,
				status: 500,
				error: "siren error",
				errorDatas: error,
			});
		}
	}

	//
	@Get(":id")
	async findOne(
		@Param("id") id: string,
		@Res() res: Response,
		@Req() req: Request,
		@Ip() ip: string,
	) {
		try {
			const userInfos = res["userInfos"];
			return super.findOne(id, res, req, ip);
		} catch (error) {}
	}
	// TODO: Modifier

	// TODO: Modifier moyen de paiement

	// TODO: FindAll
	//
	// TODO: Find One

	// TODO Delete : supprimer eteblissment associer prendre en compte plus tard les rendez en cours

	// TODO: organisation/:id/etablisshemnt
	//
}
