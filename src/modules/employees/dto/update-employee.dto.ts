import { PartialType } from "@nestjs/swagger";
import { CreateEmployeeDto } from "@modules/employees/dto/create-employee.dto";

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
