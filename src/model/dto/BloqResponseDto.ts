import { Locker } from '../entity/Locker';

export class BloqResponseDto {
  title: string;
  address: string;
  lockers: Locker[];
}
