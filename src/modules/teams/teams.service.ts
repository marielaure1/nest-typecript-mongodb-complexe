import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTeamDto } from "@modules/teams/dto/create-team.dto";
import { UpdateTeamDto } from "@modules/teams/dto/update-team.dto";
import { Team, TeamDocument } from "@modules/teams/entities/team.entity";
import { AppService } from "src/app.service";

@Injectable()
export class TeamsService extends AppService<
	TeamDocument,
	CreateTeamDto,
	CreateTeamDto
> {
	constructor(
		@InjectModel(Team.name) private teamsModel: Model<TeamDocument>,
	) {
		super(teamsModel);
	}
}
