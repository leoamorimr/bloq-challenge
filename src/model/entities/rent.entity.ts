import { RentSize } from '../enum/rentSize.enum';
import { RentStatus } from '../enum/rentStatus.enum';

export class Rent {
  id: string;

  lockerId: string;

  weight: number;

  size: RentSize;

  status: RentStatus;

}
