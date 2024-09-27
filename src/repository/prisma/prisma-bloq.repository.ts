import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { PrismaService } from "src/database/prisma.service";
import { BloqRepository } from "../bloq.repository";

@Injectable()
export class PrismaBloqRepository implements BloqRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(bloq) {
        return await this.prisma.bloq.create({
            data: {
                id: randomUUID(),
                title: bloq.title,
                address: bloq.address,
            },
        });
    }

    // async update(id, bloq) {
    //     return await prisma.bloq.update({
    //         where: { id },
    //         data: bloq,
    //     });
    // }
}