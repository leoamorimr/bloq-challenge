import { Module } from '@nestjs/common';
import { BloqController } from './controller/bloq.controller';
import { LockerController } from './controller/locker.controller';
import { RentController } from './controller/rent.controller';
import { PrismaService } from './database/prisma.service';
import { BloqRepository } from './repository/bloq.repository';
import { LockerRepository } from './repository/locker.repository';
import { PrismaBloqRepository } from './repository/prisma/prisma-bloq.repository';
import { PrismaLockerRepository } from './repository/prisma/prisma-locker.repository';
import { PrismaRentRepository } from './repository/prisma/prisma-rent.repository';
import { RentRepository } from './repository/rent.repository';
import { BloqService } from './service/bloq.service';
import { LockerService } from './service/locker.service';
import { RentService } from './service/rent.service';

@Module({
  controllers: [
    BloqController,
    LockerController,
    RentController],

  providers: [
    BloqService,
    LockerService,
    RentService,
    {
      provide: BloqRepository,
      useClass: PrismaBloqRepository //Dependency injection 
    },
    {
      provide: LockerRepository,
      useClass: PrismaLockerRepository //Dependency injection 
    },
    {
      provide: RentRepository,
      useClass: PrismaRentRepository //Dependency injection 
    },
    PrismaService
  ],
})
export class AppModule { }
