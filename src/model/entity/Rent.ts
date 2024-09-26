import { RentSize } from "../enum/RentSize";
import { RentStatus } from "../enum/RentStatus";

export class Rent {
    id: String;
    lockerId: string;
    weight: number;
    size: RentSize;
    status: RentStatus;
}