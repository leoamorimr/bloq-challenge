import { RentEntity } from "src/model/entities/rent.entity";

export abstract class RentRepository {

    abstract create(locker: RentEntity): Promise<RentEntity>;

    abstract findOne(rentId: string): Promise<RentEntity>;

}
