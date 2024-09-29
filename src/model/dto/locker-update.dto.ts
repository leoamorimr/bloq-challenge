import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsUUID } from "class-validator";
import { LockerStatus } from "../enum/locker-status.enum";

export class LockerUpdateDto {
  @ApiProperty({
    description: "Unique identifier of the bloq",
    example: "123e4567-e89b-12d3-a456-426614174000",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  bloqId?: string;

  @ApiProperty({
    description: "Status of the locker",
    example: LockerStatus.OPEN,
    enum: LockerStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(LockerStatus)
  status?: string;

  @ApiProperty({
    description: "Indicates if the locker is occupied",
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isOccupied?: boolean;
}
