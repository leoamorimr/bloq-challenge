import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class GenericRepository<T> {
  constructor(
    readonly prisma: PrismaClient,
    readonly model: Prisma.ModelName,
  ) {}

  async findAll(): Promise<T[]> {
    return this.prisma[this.model].findMany();
  }

  async findOne(id: string): Promise<T> {
    return this.prisma[this.model].findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: T): Promise<T> {
    return this.prisma[this.model].create({
      data,
    });
  }
}
