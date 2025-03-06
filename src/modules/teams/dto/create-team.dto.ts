import {
	IsBoolean,
	IsEmpty,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	Matches,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTeamDto {
	@ApiProperty({
		description: "User Id",
		example: "60d7b3b1f7c9b8001f7c9b80",
	})
	@IsNotEmpty()
	@IsString()
	userId: string;

	@ApiProperty({
		description: "Establishment Id",
		example: "60d7b3b1f7c9b8001f7c9b80",
	})
	@IsNotEmpty()
	@IsString()
	establishmentId: string;
}
