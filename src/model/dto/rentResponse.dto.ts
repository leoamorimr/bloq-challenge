import { toRentStatus } from 'src/model/enum/rentStatus.enum';
import { RentEntity } from '../entity/rent.entity';
import { RentStatus } from '../enum/rentStatus.enum';
import { LockerReponseDto } from './lockerResponse.dto';

export class RentResponseDto {
  id?: string;

  weight?: number;

  size?: string;

  status?: RentStatus;

  locker?: LockerReponseDto;

  constructor(rent: RentEntity) {
    this.id = rent?.id;
    this.weight = rent?.weight;
    this.size = rent?.size;
    this.status = toRentStatus(rent?.status) || null;
    this.locker = rent?.locker;
  }
}
