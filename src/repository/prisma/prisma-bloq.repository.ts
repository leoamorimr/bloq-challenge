import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { PrismaService } from "src/database/prisma.service";
import { BloqEntity } from "src/model/entities/bloq.entity";
import { BloqRepository } from "../bloq.repository";

@Injectable()
export class PrismaBloqRepository implements BloqRepository {
    constructor(private readonly prisma: PrismaService) { }

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