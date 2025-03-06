import { PartialType } from "@nestjs/swagger";
import { CreateRefreshTokenDto } from "@modules/auth/dto/create-refresh-token.dto";

export class UpdateRefreshTokenDto extends PartialType(CreateRefreshTokenDto) {}
