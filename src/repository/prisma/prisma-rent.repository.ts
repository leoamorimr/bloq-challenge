import { Injectable } from "@nestjs/common";
import { isNil, omitBy } from "lodash";
import { randomUUID } from "node:crypto";
import { PrismaService } from "src/database/prisma.service";
import { RentEntity } from "src/model/entity/rent.entity";
import { PrismaRepository } from "../prisma.repository";

@Injectable()
export class PrismaRentRepository extends PrismaRepository<RentEntity> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.rent);
  }

  async create(rent: RentEntity): Promise<RentEntity> {
    return await this.prisma.rent.create({
      data: {
        id: randomUUID(),
        lockerId: rent.lockerId,
        weight: rent.weight,
        size: rent.size,
        status: rent.status,
      },
      include: {
        locker: true,
      },
    });
  }

  async exists(rentId: string): Promise<boolean> {
    return (
      (await this.prisma.rent.findUnique({ where: { id: rentId } })) !== null
    );
  }

  async update(rentId: string, rent: RentEntity): Promise<RentEntity> {
    // Omit null values
    const data = omitBy(
      {
        lockerId: rent.lockerId,
        weight: rent.weight,
        size: rent.size,
        status: rent.status,
      },
      isNil,
    );

    return await this.prisma.rent.update({
      data,
      where: {
        id: rentId,
      },
    });
  }

  async delete(rentId: string): Promise<void> {
    await super.delete(rentId);
  }

  async findAll(): Promise<RentEntity[]> {
    return await super.findAll({
      include: {
        locker: true,
      },
    });
  }
}
