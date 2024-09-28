import { RentCreateDto } from "../../src/model/dto/rent-create.dto";
import { RentResponseDto } from "../../src/model/dto/rent-response.dto";
import { RentUpdateDto } from "../../src/model/dto/rent-update.dto";
import { RentEntity } from "../../src/model/entity/rent.entity";
import { RentSize } from "../../src/model/enum/rent-size.enum";
import { RentStatus } from "../../src/model/enum/rent-status.enum";

export const fakeRentRequestDto: RentCreateDto | RentUpdateDto = {
  lockerId: "any-uuid",
  status: RentStatus.CREATED,
  size: RentSize.L,
  weight: 0,
};

export const fakeRentResponseDto: RentResponseDto = {
  id: "any-uuid",
  locker: {
    id: "any-uuid",
    isOccupied: true,
    status: "any status",
  },
  status: RentStatus.CREATED,
  size: RentSize.L,
  weight: 0,
};

export const fakeRentEntity: RentEntity = {
  id: "any-uuid",
  lockerId: "any-uuid",
  weight: 7,
  size: "L",
  status: "WAITING_PICKUP",
};
