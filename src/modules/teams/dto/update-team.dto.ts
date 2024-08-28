import { PartialType } from "@nestjs/swagger";
import { CreateTeamDto } from "@modules/teams/dto/create-team.dto";

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
