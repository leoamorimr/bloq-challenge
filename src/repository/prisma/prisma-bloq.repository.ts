import { Injectable } from "@nestjs/common";
import { isNil, omitBy } from "lodash";
import { randomUUID } from "node:crypto";
import { BloqEntity } from "src/model/entity/bloq.entity";
import { PrismaService } from "../../database/prisma.service";
import { PrismaRepository } from "../prisma.repository";

@Injectable()
export class PrismaBloqRepository extends PrismaRepository<BloqEntity> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.bloq);
  }

  async update(bloqId: string, bloq: BloqEntity): Promise<BloqEntity> {
    const data = omitBy(
      {
        title: bloq.title,
        address: bloq.address,
      },
      isNil,
    );

    return await this.prisma.bloq.update({
      data,
      where: {
        id: bloqId,
      },
    });
  }

  async create(bloq: BloqEntity): Promise<BloqEntity> {
    return await this.prisma.bloq.create({
      data: {
        id: randomUUID(),
        title: bloq.title,
        address: bloq.address,
      },
    });
  }
}
