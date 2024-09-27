import { BloqEntity } from "src/model/entities/bloq.entity";

export abstract class BloqRepository {

    abstract create(bloq: BloqEntity): Promise<BloqEntity>;

}
