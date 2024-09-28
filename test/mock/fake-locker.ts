import { randomUUID } from "crypto";
import { LockerCreateDto } from "src/model/dto/locker-create.dto";
import { LockerReponseDto } from "src/model/dto/locker-response.dto";
import { LockerUpdateDto } from "src/model/dto/locker-update.dto";
import { LockerEntity } from "../../src/model/entity/locker.entity";

export const fakeLockRequestDto: LockerCreateDto | LockerUpdateDto = {
  bloqId: "any-uuid",
  status: "any status",
  isOccupied: false,
};

export const fakeLockResponseDto: LockerReponseDto = {
  status: "any status",
  isOccupied: false,
  id: "any-uuid",
  bloq: {
    id: "any-uuid",
    title: "any title",
    address: "any address",
  },
};

export const fakeLockEntity: LockerEntity = {
  id: "any-uuid",
  bloqId: "any-uuid",
  status: "any status",
  isOccupied: false,
};

export const fakeUUID = randomUUID();
