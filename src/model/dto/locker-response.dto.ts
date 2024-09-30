import { ApiProperty } from "@nestjs/swagger";
import { LockerEntity } from "../entity/locker.entity";
import { BloqResponseDto } from "./bloq-response.dto";

export class LockerResponseDto {
  @ApiProperty({
    description: "Unique identifier of the locker",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id?: string;

  @ApiProperty({
    description: "Status of the locker",
    example: "AVAILABLE",
  })
  status?: string;

  @ApiProperty({
    description: "Indicates if the locker is occupied",
    example: false,
  })
  isOccupied?: boolean;

  @ApiProperty({
    description: "Bloq associated with the locker",
    type: BloqResponseDto,
  })
  bloq?: BloqResponseDto;

  constructor(locker: LockerEntity) {
    this.id = locker?.id;
    this.status = locker?.status;
    this.isOccupied = locker?.isOccupied;
    this.bloq = locker?.bloq;
  }
}
