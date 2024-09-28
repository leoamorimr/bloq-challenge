import { Injectable } from '@nestjs/common';
import { isNil, omitBy } from 'lodash';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { LockerEntity } from 'src/model/entity/locker.entity';
import { LockerStatus } from 'src/model/enum/locker-status.enum';

@Injectable()
export class LockerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(locker: LockerEntity): Promise<LockerEntity> {
    return await this.prisma.locker.create({
      data: {
        id: randomUUID(),
        bloqId: locker.bloqId,
        status: locker.status,
        isOccupied: locker.isOccupied,
      },
    });
  }

  async exists(lockerId: string): Promise<boolean> {
    return (
      (await this.prisma.locker.findUnique({
        where: {
          id: lockerId,
        },
      })) !== null
    );
  }

  async isAvailable(lockerId: string): Promise<boolean> {
    const locker = await this.prisma.locker.findUnique({
      where: {
        id: lockerId,
      },
    });
    return locker.isOccupied === false;
  }

  async changeOccupied(
    lockerId: string,
    isOccupied: boolean,
  ): Promise<LockerEntity> {
    let data;

    if (isOccupied) {
      data = {
        isOccupied: true,
        status: LockerStatus.CLOSED,
      };
    } else {
      data = {
        isOccupied: false,
        status: LockerStatus.OPEN,
      };
    }

    return await this.prisma.locker.update({
      where: {
        id: lockerId,
      },
      data,
    });
  }

  async findOneOrThrow(lockerId: string): Promise<LockerEntity> {
    return await this.prisma.locker.findUniqueOrThrow({
      where: {
        id: lockerId,
      },
    });
  }

  async update(locker: LockerEntity): Promise<LockerEntity> {
    // Omit null values
    const data = omitBy(
      {
        bloqId: locker.bloqId,
        status: locker.status,
        isOccupied: locker.isOccupied,
      },
      isNil,
    );

    return await this.prisma.locker.update({
      data,
      where: {
        id: locker.id,
      },
    });
  }
}
