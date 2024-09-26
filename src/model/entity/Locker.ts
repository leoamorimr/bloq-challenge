import { LockerStatus } from "../enum/LockerStatus";

export class Locker {
    id: String;
    bloqId: String;
    status: LockerStatus;
    isOccupied: Boolean;
}
