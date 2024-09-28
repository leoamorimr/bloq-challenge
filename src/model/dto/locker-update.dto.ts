import { IsBoolean, IsEnum, IsOptional, IsUUID } from "class-validator";
import { LockerStatus } from "../enum/locker-status.enum";

export class LockerUpdateDto {
  @IsOptional()
  @IsUUID()
  bloqId?: string;

  @IsOptional()
  @IsEnum(LockerStatus)
  status?: string;

  @IsOptional()
  @IsBoolean()
  isOccupied?: boolean;
}
