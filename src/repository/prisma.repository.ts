import { PrismaService } from "../database/prisma.service";
import { Repository } from "./interface/repository.interface";

export class PrismaRepository<T> implements Repository<T> {
  protected readonly prisma: PrismaService;
  private readonly model: any;

  constructor(prisma: PrismaService, model: any) {
    this.prisma = prisma;
    this.model = model;
  }

  async findAll(args?: object): Promise<T[]> {
    return await this.model.findMany(args);
  }

  async findUnique(id: string, args?: object): Promise<T> {
    return await this.model.findUnique({
      where: { id },
      args,
    });
  }

  async findUniqueOrThrow(id: string, args?: any): Promise<T> {
    return await this.model.findUniqueOrThrow({
      where: { id },
      args,
    });
  }

  async create(entity: T): Promise<T> {
    return await this.model.create({
      data: entity,
    });
  }

  async update(id: string, entity: T): Promise<T> {
    return await this.model.update({
      where: { id },
      data: entity,
    });
  }

  async delete(id: string): Promise<void> {
    await this.model.delete({
      where: { id },
    });
  }
}
