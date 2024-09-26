import { LockerStatus } from '../enum/LockerStatus';

export class Locker {
  id: string;
  bloqId: string;
  status: LockerStatus;
  isOccupied: boolean;
}
