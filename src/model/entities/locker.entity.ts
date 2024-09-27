import { UUID } from 'crypto';
import { LockerStatus } from '../enum/lockerStatus.enum';
import { Bloq } from './bloq.entity';

export class Locker {
  id: UUID;

  bloqId: UUID;

  status: LockerStatus;

  isOccupied: boolean;

  bloq: Bloq;
}
