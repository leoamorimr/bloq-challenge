import { LockerEntity } from '../entities/locker.entity';
import { LockerReponseDto } from './lockerResponse.dto';

export class BloqResponseDto {
  title: string;
  address: string;
  lockers?: LockerReponseDto[];

  constructor(title: string, address: string, lockers?: LockerEntity[]) {
    this.title = title;
    this.address = address;
    this.lockers = lockers;
  }
}
