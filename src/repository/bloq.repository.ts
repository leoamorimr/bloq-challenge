import { Bloq } from "src/model/entities/bloq.entity";

export abstract class BloqRepository {

    abstract create(bloq: Bloq): Promise<Bloq>;

}
