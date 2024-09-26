import { Module } from '@nestjs/common';
import { BloqController } from './controller/BloqController';
import { LockerController } from './controller/LockerController';
import { RentController } from './controller/RentController';

@Module({
  imports: [],
  controllers: [BloqController, LockerController, RentController],
  providers: [],
})
export class AppModule { }
