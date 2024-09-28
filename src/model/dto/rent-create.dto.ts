import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { RentSize } from "../enum/rent-size.enum";
import { RentStatus } from "../enum/rent-status.enum";

export class RentCreateDto {
  @IsOptional()
  @IsUUID()
  lockerId?: string;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  @IsEnum(RentSize)
  size: RentSize;

  @IsNotEmpty()
  @IsEnum(RentStatus)
  status: RentStatus;
}
