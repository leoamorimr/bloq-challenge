import { IsBoolean, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { LockerStatus } from "../enum/locker-status.enum";

export class LockerCreateDto {
  @IsNotEmpty()
  @IsUUID()
  bloqId: string;

  @IsNotEmpty()
  @IsEnum(LockerStatus)
  status: string;

  @IsNotEmpty()
  @IsBoolean()
  isOccupied: boolean;
}
