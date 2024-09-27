import { RentStatus } from "../enum/rentStatus.enum";
import { LockerReponseDto } from "./lockerResponse.dto";

export class RentResponseDto {
    id?: string

    weight: number;

    size: string;

    status: RentStatus;

    locker?: LockerReponseDto;

    constructor(weight: number, size: string, status: RentStatus, locker?: LockerReponseDto, id?: string) {
        this.weight = weight;
        this.size = size;
        this.status = status;
        this.locker = locker;
        this.id = id;
    }
}   