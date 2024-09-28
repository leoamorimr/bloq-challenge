import { BloqEntity } from 'src/model/entity/bloq.entity';

export abstract class BloqRepository {
  abstract create(bloq: BloqEntity): Promise<BloqEntity>;
}
