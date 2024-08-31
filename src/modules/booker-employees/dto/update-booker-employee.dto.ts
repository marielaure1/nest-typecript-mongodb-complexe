import { PartialType } from "@nestjs/swagger";
import { CreateBookerEmployeeDto } from "@modules/booker-employees/dto/create-booker-employee.dto";

export class UpdateBookerEmployeeDto extends PartialType(
	CreateBookerEmployeeDto,
) {}
