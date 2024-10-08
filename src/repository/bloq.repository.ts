import { BloqEntity } from "src/model/entity/bloq.entity";

export abstract class BloqRepository {
  abstract create(bloq: BloqEntity): Promise<BloqEntity>;
  abstract update(bloqId: string, bloq: BloqEntity): Promise<BloqEntity>;
  abstract findOne(bloqId: string): Promise<BloqEntity>;
  abstract findUniqueOrThrow(bloqId: string): Promise<BloqEntity>;
  abstract findAll(): Promise<BloqEntity[]>;
}
