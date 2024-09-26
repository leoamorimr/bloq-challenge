import { Module } from '@nestjs/common';
import { BloqController } from './controller/BloqController';
import { LockerController } from './controller/LockerController';
import { RentController } from './controller/RentController';
import { BloqService } from './service/BloqService';
import { LockerService } from './service/LockerService';
import { RentService } from './service/RentService';

@Module({
  imports: [],
  controllers: [BloqController, LockerController, RentController],
  providers: [BloqService, LockerService, RentService],
})
export class AppModule {}
