import { BloqResponseDto } from "./bloqResponse.dto";

export class LockerReponseDto {
    id?: string;

    status: string;

    isOccupied: boolean;

    bloq?: BloqResponseDto;

    constructor(status: string, isOccupied: boolean, bloq?: BloqResponseDto, id?: string) {
        this.id = id;
        this.status = status;
        this.isOccupied = isOccupied;
        this.bloq = bloq;
    }
}