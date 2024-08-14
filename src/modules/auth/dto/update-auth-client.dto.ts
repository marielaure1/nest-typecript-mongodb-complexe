import { PartialType } from "@nestjs/swagger";
import { CreateAuthClientDto } from "@modules/auth/dto/create-auth-client.dto";

export class UpdateAuthClientDto extends PartialType(CreateAuthClientDto) {}
