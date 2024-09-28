import { BloqEntity } from '../entity/bloq.entity';
import { LockerReponseDto } from './locker-response.dto';

export class BloqResponseDto {
  id?: string;
  title?: string;
  address?: string;
  lockers?: LockerReponseDto[];

  constructor(bloq: BloqEntity) {
    this.title = bloq?.title;
    this.address = bloq?.address;
    this.lockers = bloq?.lockers;
    this.id = bloq?.id;
  }
}
