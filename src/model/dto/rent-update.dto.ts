import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { RentSize } from "../enum/rent-size.enum";
import { RentStatus } from "../enum/rent-status.enum";

export class RentUpdateDto {
  @IsOptional()
  @IsUUID()
  lockerId?: string;

  @IsOptional()
  weight?: number;

  @IsOptional()
  @IsEnum(RentSize)
  size?: RentSize;

  @IsOptional()
  @IsEnum(RentStatus)
  status?: RentStatus;
}
