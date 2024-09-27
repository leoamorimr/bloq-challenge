import { Module } from '@nestjs/common';
import { BloqController } from './controller/bloq.controller';
import { LockerController } from './controller/locker.controller';
import { RentController } from './controller/rent.controller';
import { PrismaService } from './database/prisma.service';
import { BloqRepository } from './repository/bloq.repository';
import { PrismaBloqRepository } from './repository/prisma/prisma-bloq.repository';
import { BloqService } from './service/bloq.service';
import { LockerService } from './service/locker.service';
import { RentService } from './service/RentService';

@Module({
  controllers: [BloqController, LockerController, RentController],
  providers: [BloqService,
    LockerService,
    RentService,
    {
      provide: BloqRepository,
      useClass: PrismaBloqRepository
    },
    PrismaService
  ],
})
export class AppModule { }
