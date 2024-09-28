import { BloqEntity } from './bloq.entity';

export class LockerEntity {
  id?: string;

  bloqId: string;

  status: string;

  isOccupied: boolean;

  bloq?: BloqEntity;

  constructor(
    bloqId: string,
    status: string,
    isOccupied: boolean,
    id?: string,
  ) {
    this.bloqId = bloqId;
    this.status = status;
    this.isOccupied = isOccupied;
    this.id = id;
  }
}
