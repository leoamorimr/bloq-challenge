import { toRentStatus } from "src/model/enum/rent-status.enum";
import { RentEntity } from "../entity/rent.entity";
import { RentStatus } from "../enum/rent-status.enum";
import { LockerResponseDto } from "./locker-response.dto";

export class RentResponseDto {
  id?: string;

  weight?: number;

  size?: string;

  status?: RentStatus;

  locker?: LockerResponseDto;

  constructor(rent: RentEntity) {
    this.id = rent?.id;
    this.weight = rent?.weight;
    this.size = rent?.size;
    this.status = toRentStatus(rent?.status) || null;
    this.locker = rent?.locker;
  }
}
