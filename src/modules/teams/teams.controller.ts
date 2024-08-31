import { Controller } from "@nestjs/common";
import { TeamsService } from "@modules/teams/teams.service";
import { CreateTeamDto } from "@modules/teams/dto/create-team.dto";
import { UpdateTeamDto } from "@modules/teams/dto/update-team.dto";
import { TeamDocument } from "@modules/teams/entities/team.entity";
import { AppController } from "src/app.controller";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { Response } from "express";
import { LogHelper } from "@modules/logs/helpers/log.helper";
import { log } from "console";
import { Connection } from "mongoose";

@ApiTags("teams")
@Controller("teams")
export class TeamsController extends AppController<
	TeamDocument,
	CreateTeamDto,
	UpdateTeamDto
> {
	constructor(
		private readonly teamsService: TeamsService,
		logHelper: LogHelper,
		connection: Connection,
	) {
		super(teamsService, "teams", connection, logHelper);
	}
}
