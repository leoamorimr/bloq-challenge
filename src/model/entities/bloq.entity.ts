import { Locker } from './locker.entity';

export class Bloq {
  id?: string;

  title: string;

  address: string;

  lockers?: Locker[];

  constructor(title: string, address: string) {
    this.title = title;
    this.address = address;
  }
}
