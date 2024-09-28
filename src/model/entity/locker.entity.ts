import { BloqEntity } from './bloq.entity';

export class LockerEntity {
  id?: string;

  bloqId: string;

  status: string;

  isOccupied: boolean;

  bloq?: BloqEntity;
}
