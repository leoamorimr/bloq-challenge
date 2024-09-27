import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { LockerRepository } from 'src/repository/locker.repository';

@Injectable()
export class LockerService {
  constructor(
    private readonly lockerRepository: LockerRepository,
    @InjectPinoLogger(LockerService.name) private readonly logger: PinoLogger

  ) { }


  async isLockerAvailable(lockerId: string): Promise<boolean> {
    const lockerExist = await this.lockerExists(lockerId);

    if (!lockerExist) {
      throw new NotFoundException('Locker does not exist');
    }

    this.logger.info(`Checking if locker: ${lockerId} is available`);
    const isAvailable = await this.lockerRepository.isAvailable(lockerId);

    return isAvailable;
  }

  async lockerExists(lockerId: string): Promise<boolean> {
    this.logger.info("Checking if locker exists");
    return this.lockerRepository.exists(lockerId);
  }

  async changeOccupied(lockerId: string, isOccupied: boolean): Promise<any> {
    this.logger.info(`Changing locker ${lockerId} occupied status to: ${isOccupied}`);
    return this.lockerRepository.changeOccupied(lockerId, isOccupied);
  }


}
