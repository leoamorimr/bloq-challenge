import { LockerEntity } from '../entity/locker.entity';
import { BloqResponseDto } from './bloq-response.dto';

export class LockerReponseDto {
  id?: string;

  status?: string;

  isOccupied?: boolean;

  bloq?: BloqResponseDto;

  constructor(locker: LockerEntity) {
    this.id = locker?.id;
    this.status = locker?.status;
    this.isOccupied = locker?.isOccupied;
    this.bloq = locker?.bloq;
  }
}
