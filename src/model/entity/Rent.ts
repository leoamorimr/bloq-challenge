import { RentSize } from '../enum/RentSize';
import { RentStatus } from '../enum/RentStatus';

export class Rent {
  id: string;
  lockerId: string;
  weight: number;
  size: RentSize;
  status: RentStatus;
}
