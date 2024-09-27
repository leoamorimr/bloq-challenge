import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { randomUUID } from "node:crypto";
import { PrismaService } from "src/database/prisma.service";
import { LockerEntity } from "src/model/entities/locker.entity";
import { LockerRepository } from "../locker.repository";

@Injectable()
export class PrismaLockerRepository implements LockerRepository {

    constructor(private readonly prisma: PrismaService) { }

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

    async exists(lockerId: UUID): Promise<boolean> {
        return await this.prisma.locker.findUnique({
            where: {
                id: lockerId,
            },
        }) !== null;
    }

    async isAvailable(lockerId: UUID): Promise<boolean> {
        const locker = await this.prisma.locker.findUnique({
            where: {
                id: lockerId
            },
        });
        return locker.isOccupied === false;
    }

    async changeOccupied(lockerId: string, isOccupied: boolean): Promise<LockerEntity> {
        return await this.prisma.locker.update({
            where: {
                id: lockerId,
            },
            data: {
                isOccupied: isOccupied,
            },
        });
    }

}