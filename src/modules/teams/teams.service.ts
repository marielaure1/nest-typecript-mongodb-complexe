// Base
import { Injectable, Logger } from "@nestjs/common";

// Dependencies
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Dtos
import { CreateTeamDto } from "@modules/teams/dto/create-team.dto";
import { UpdateTeamDto } from "@modules/teams/dto/update-team.dto";

// Entities

import { Team, TeamDocument } from "@modules/teams/entities/team.entity";

// Services

import { AppService } from "@src/app.service";

@Injectable()
export class TeamsService extends AppService<
	TeamDocument,
	CreateTeamDto,
	UpdateTeamDto
> {
	private readonly logger = new Logger(TeamsService.name);

	constructor(
		@InjectModel(Team.name) private teamsModel: Model<TeamDocument>,
	) {
		super(teamsModel);
	}
}
