import { RentEntity } from 'src/model/entity/rent.entity';

export abstract class RentRepository {
  abstract create(rent: RentEntity): Promise<RentEntity>;
  abstract findOneOrThrow(rentId: string): Promise<RentEntity>;
  abstract exists(rentId: string): Promise<boolean>;
  abstract update(rent: RentEntity): Promise<RentEntity>;
  abstract delete(rentId: string): Promise<void>;
}
