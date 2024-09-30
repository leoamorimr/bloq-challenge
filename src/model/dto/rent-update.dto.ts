import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { RentSize } from "../enum/rent-size.enum";
import { RentStatus } from "../enum/rent-status.enum";

export class RentUpdateDto {
  @ApiProperty({
    description: "Unique identifier of the locker",
    example: "123e4567-e89b-12d3-a456-426614174000",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  lockerId?: string;

  @ApiProperty({
    description: "Weight of the rent",
    example: 25.5,
    required: false,
  })
  @IsOptional()
  weight?: number;

  @ApiProperty({
    description: "Size of the rent",
    example: RentSize.L,
    enum: RentSize,
    required: false,
  })
  @IsOptional()
  @IsEnum(RentSize)
  size?: RentSize;

  @ApiProperty({
    description: "Status of the rent",
    example: RentStatus.CREATED,
    enum: RentStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(RentStatus)
  status?: RentStatus;
}
