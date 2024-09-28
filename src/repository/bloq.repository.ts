import { BloqEntity } from 'src/model/entity/bloq.entity';

export abstract class BloqRepository {
  abstract findOne(bloqId: string): Promise<BloqEntity>;
  abstract update(bloqEntity: BloqEntity): Promise<BloqEntity>;
  abstract create(bloq: BloqEntity): Promise<BloqEntity>;
}
