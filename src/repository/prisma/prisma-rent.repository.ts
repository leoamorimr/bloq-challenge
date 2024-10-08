import { Injectable } from "@nestjs/common";
import { isNil, omitBy } from "lodash";
import { randomUUID } from "node:crypto";
import {} from "prisma";
import { PrismaService } from "src/database/prisma.service";
import { RentEntity } from "src/model/entity/rent.entity";
import { RentRepository } from "../rent.repository";

@Injectable()
export class PrismaRentRepository implements RentRepository {
  constructor(private readonly prisma: PrismaService) {}

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

  async findOneOrThrow(rentId: string): Promise<RentEntity> {
    return await this.prisma.rent.findUniqueOrThrow({
      where: {
        id: rentId,
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
        id: rent.id,
      },
    });
  }

  async delete(rentId: string): Promise<void> {
    await this.prisma.rent.delete({
      where: {
        id: rentId,
      },
    });
  }

  async findAll(): Promise<RentEntity[]> {
    return await this.prisma.rent.findMany({
      include: {
        locker: true,
      },
    });
  }
}
