import { LockerEntity } from './locker.entity';

export class RentEntity {
  id: string;

  lockerId?: string;

  weight: number;

  size: string;

  status: string;

  locker?: LockerEntity;

  constructor(
    lockerId: string,
    weight: number,
    size: string,
    status: string,
    id?: string,
  ) {
    this.lockerId = lockerId;
    this.weight = weight;
    this.size = size;
    this.status = status;
    this.id = id;
  }
}
