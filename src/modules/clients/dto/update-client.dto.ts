import { PartialType } from "@nestjs/swagger";
import { CreateClientDto } from "@modules/clients/dto/create-client.dto";

export class UpdateClientDto extends PartialType(CreateClientDto) {}
