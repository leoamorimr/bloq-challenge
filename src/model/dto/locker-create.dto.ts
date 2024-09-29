import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { LockerStatus } from "../enum/locker-status.enum";

export class LockerCreateDto {
  @ApiProperty({
    description: "Unique identifier of the bloq",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsNotEmpty()
  @IsUUID()
  bloqId: string;

  @ApiProperty({
    description: "Status of the locker",
    example: LockerStatus.OPEN,
    enum: LockerStatus,
  })
  @IsNotEmpty()
  @IsEnum(LockerStatus)
  status: string;

  @ApiProperty({
    description: "Indicates if the locker is occupied",
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isOccupied: boolean;
}
