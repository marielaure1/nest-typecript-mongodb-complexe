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
import { FastifyReply } from "fastify";


import { Connection } from "mongoose";
import { LogsService } from "@modules/logs/logs.service";

@ApiTags("teams")
@Controller("teams")
export class TeamsController extends AppController<
	TeamDocument,
	CreateTeamDto,
	UpdateTeamDto
> {
	constructor(
		private readonly teamsService: TeamsService,
		connection: Connection,
	) {
		super(teamsService, "teams", connection);
	}
}
