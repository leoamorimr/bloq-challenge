import { UUID } from 'node:crypto';
import { Locker } from './Locker';

export class Bloq {
  id: UUID;
  title: string;
  address: string;
  lockers: Locker[];
}
