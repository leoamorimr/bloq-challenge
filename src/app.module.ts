import { Module } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { BloqController } from "./controller/bloq.controller";
import { LockerController } from "./controller/locker.controller";
import { RentController } from "./controller/rent.controller";
import { DbModule } from "./database/db.module";
import { CustomLoggerModule } from "./logger/logger.module";
import { PrismaBloqRepository } from "./repository/prisma/prisma-bloq.repository";
import { PrismaLockerRepository } from "./repository/prisma/prisma-locker.repository";
import { PrismaRentRepository } from "./repository/prisma/prisma-rent.repository";
import { BloqService } from "./service/bloq.service";
import { LockerService } from "./service/locker.service";
import { RentService } from "./service/rent.service";

@Module({
  imports: [CustomLoggerModule, DbModule],

  controllers: [BloqController, LockerController, RentController],

  providers: [
    BloqService,
    LockerService,
    RentService,
    PinoLogger,
    PrismaBloqRepository,
    PrismaLockerRepository,
    PrismaRentRepository,
  ],
})
export class AppModule {}
