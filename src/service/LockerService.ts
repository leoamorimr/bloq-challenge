import { Injectable } from '@nestjs/common';
import { UUID } from 'node:crypto';

@Injectable()
export class LockerService {
  constructor() { }

  get(): string {
    //Implement logic here
    return 'get';
  }

  getOne(id: UUID): string {
    //Implement logic here
    return 'getOne';
  }

  create(lock: any): string {
    //Implement logic here
    return 'created';
  }

  update(id: UUID, lock: any): string {
    //Implement logic here
    return 'updated';
  }

  delete(id: UUID): string {
    //Implement logic here
    return 'deleted';
  }
}
