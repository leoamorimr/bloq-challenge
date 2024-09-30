import { ApiProperty } from "@nestjs/swagger";
import { toRentStatus } from "src/model/enum/rent-status.enum";
import { RentEntity } from "../entity/rent.entity";
import { RentStatus } from "../enum/rent-status.enum";
import { LockerResponseDto } from "./locker-response.dto";

export class RentResponseDto {
  @ApiProperty({
    description: "Unique identifier of the rent",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id?: string;

  @ApiProperty({
    description: "Weight of the rent",
    example: 25.5,
  })
  weight?: number;

  @ApiProperty({
    description: "Size of the rent",
    example: "SMALL",
  })
  size?: string;

  @ApiProperty({
    description: "Status of the rent",
    example: RentStatus.CREATED,
    enum: RentStatus,
  })
  status?: RentStatus;

  @ApiProperty({
    description: "Locker associated with the rent",
    type: LockerResponseDto,
  })
  locker?: LockerResponseDto;

  constructor(rent: RentEntity) {
    this.id = rent?.id;
    this.weight = rent?.weight;
    this.size = rent?.size;
    this.status = toRentStatus(rent?.status) || null;
    this.locker = rent?.locker;
  }
}
