import { LockerEntity } from "src/model/entities/locker.entity";


export abstract class LockerRepository {

    abstract create(locker: LockerEntity): Promise<LockerEntity>;

    abstract exists(lockerId: string): Promise<boolean>;

    abstract isAvailable(lockerId: string): Promise<boolean>;

    abstract changeOccupied(lockerId: string, isOccupied: boolean): Promise<LockerEntity>;

}
