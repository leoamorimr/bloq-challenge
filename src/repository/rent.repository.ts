import { RentEntity } from 'src/model/entity/rent.entity';

export abstract class RentRepository {
  abstract create(locker: RentEntity): Promise<RentEntity>;

  abstract findOneOrThrow(rentId: string): Promise<RentEntity>;

  abstract update(rent: RentEntity): Promise<RentEntity>;
}
