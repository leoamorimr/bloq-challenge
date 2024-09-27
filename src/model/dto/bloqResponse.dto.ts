import { Bloq } from '../entities/bloq.entity';
import { Locker } from '../entities/locker.entity';

export class BloqResponseDto {
  title: string;
  address: string;
  lockers: Locker[];

  constructor(bloqEntity: Bloq) {
    this.title = bloqEntity.title;
    this.address = bloqEntity.address;
    this.lockers = bloqEntity.lockers;
  }
}
