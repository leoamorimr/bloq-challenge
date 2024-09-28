import { Injectable } from '@nestjs/common';
import { isNil, omitBy } from 'lodash';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { BloqRequestDto } from 'src/model/dto/bloq-create.dto';
import { BloqEntity } from 'src/model/entity/bloq.entity';
import { BloqRepository } from '../bloq.repository';

@Injectable()
export class PrismaBloqRepository implements BloqRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findOne(bloqId: string): Promise<BloqEntity> {
    return await this.prisma.bloq.findUnique({
      where: {
        id: bloqId,
      },
    });
  }

  async update(bloqId: string, bloq: BloqRequestDto): Promise<BloqEntity> {
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
