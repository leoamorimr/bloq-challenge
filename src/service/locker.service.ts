import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { LockerReponseDto } from 'src/model/dto/locker-response.dto';
import { LockerUpdateDto } from 'src/model/dto/locker-update.dto';
import { LockerEntity } from 'src/model/entity/locker.entity';
import { LockerStatus } from 'src/model/enum/locker-status.enum';
import { LockerRepository } from 'src/repository/locker.repository';

@Injectable()
export class LockerService {
  constructor(
    private readonly lockerRepository: LockerRepository,
    private readonly logger: PinoLogger,
  ) {}

  async isLockerAvailable(lockerId: string): Promise<boolean> {
    this.logger.info(`Checking if locker: ${lockerId} is available`);
    const isAvailable = await this.lockerRepository.isAvailable(lockerId);

    return isAvailable;
  }

  async lockerExists(lockerId: string): Promise<boolean> {
    this.logger.info('Checking if locker exists');
    return await this.lockerRepository.exists(lockerId);
  }

  async changeOccupied(lockerId: string, isOccupied?: boolean): Promise<any> {
    this.logger.info(
      `Changing locker ${lockerId} occupied status to: ${isOccupied}`,
    );
    return await this.lockerRepository.changeOccupied(lockerId, isOccupied);
  }

  async getLockerInfo(lockerId: string): Promise<LockerEntity> {
    this.logger.info('Getting locker info');
    return await this.lockerRepository.findOneOrThrow(lockerId);
  }

  async update(
    lockerId: string,
    lockerDto: LockerUpdateDto,
  ): Promise<LockerReponseDto> {
    const lockerEntity = new LockerEntity(
      lockerDto?.blockId,
      lockerDto?.status,
      lockerDto?.isOccupied,
    );

    //TODO: Extract this logic
    this.logger.info(`Checking if locker ${lockerId} exists`);
    if (!(await this.lockerExists(lockerId))) {
      this.logger.error(`Locker ${lockerId} does not exist`);
      throw new NotFoundException('Locker does not exist');
    }

    const isLockerAvailable =
      lockerDto.isOccupied === false || lockerDto.status === LockerStatus.OPEN;

    // Check if locker is occupied. If so, thats not possible to update occupied status
    if (isLockerAvailable && !(await this.isLockerAvailable(lockerId))) {
      this.logger.error(`Locker ${lockerId} is not available`);
      throw new BadRequestException(
        'Locker is occupied. Please retrieve it first',
      );
    }

    this.logger.info(`Updating locker`);
    const updatedLocker = await this.lockerRepository
      .update(lockerEntity)
      .then(async (locker) => {
        await this.changeOccupied(locker.id, lockerDto?.isOccupied);
        return await this.lockerRepository.findOneOrThrow(locker.id);
      })
      .catch((error) => {
        throw new InternalServerErrorException(
          `Error updating Locker`,
          error.message,
        );
      });

    return new LockerReponseDto(updatedLocker);
  }
}
