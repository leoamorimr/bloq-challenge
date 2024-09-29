import { ApiProperty } from "@nestjs/swagger";
import { BloqEntity } from "../entity/bloq.entity";
import { LockerResponseDto } from "./locker-response.dto";

export class BloqResponseDto {
  @ApiProperty({
    description: "Unique identifier of the bloq",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id?: string;

  @ApiProperty({
    description: "Title of the bloq",
    example: "My Bloq Title",
  })
  title?: string;

  @ApiProperty({
    description: "Address of the bloq",
    example: "1234 Bloq Street",
  })
  address?: string;

  @ApiProperty({
    description: "List of lockers associated with the bloq",
    type: [LockerResponseDto],
  })
  lockers?: LockerResponseDto[];

  constructor(bloq: BloqEntity) {
    this.title = bloq?.title;
    this.address = bloq?.address;
    this.lockers = bloq?.lockers;
    this.id = bloq?.id;
  }
}
