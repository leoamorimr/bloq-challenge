import { LockerEntity } from "./locker.entity";

export class BloqEntity {
  id?: string;

  title: string;

  address: string;

  lockers?: LockerEntity[];

  constructor(title: string, address: string, id?: string) {
    this.title = title;
    this.address = address;
    this.id = id;
  }
}
