import { Injectable } from '@nestjs/common';
import { isNil, omitBy } from 'lodash';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { BloqEntity } from 'src/model/entity/bloq.entity';

@Injectable()
export class BloqRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(bloqId: string): Promise<BloqEntity> {
    return await this.prisma.bloq.findUnique({
      where: {
        id: bloqId,
      },
    });
  }

  async update(bloq: BloqEntity): Promise<BloqEntity> {
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
        id: bloq.id,
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
