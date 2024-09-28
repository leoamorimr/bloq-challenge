import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { UUID } from 'node:crypto';
import { RentCreateDto } from 'src/model/dto/rentCreate.dto';
import { RentResponseDto } from 'src/model/dto/rentResponse.dto';
import { RentUpdateDto } from 'src/model/dto/rentUpdate.dto';
import { RentEntity } from 'src/model/entity/rent.entity';
import { RentRepository } from 'src/repository/rent.repository';
import { LockerService } from './locker.service';

@Injectable()
export class RentService {
  constructor(
    private readonly rentRepository: RentRepository,
    private readonly lockerService: LockerService,
    private readonly logger: PinoLogger,
  ) { }

  async create(rentDto: RentCreateDto): Promise<RentResponseDto> {
    this.logger.info('Creating new rent');

    // Convert DTO to entity
    const rentEntity = new RentEntity(
      rentDto.lockerId,
      rentDto.weight,
      rentDto.size,
      rentDto.status,
    );

    // Save new rent without locker
    if (!rentDto.lockerId) {
      const newRent = await this.rentRepository.create(rentEntity);

      return new RentResponseDto(newRent);
    }

    const lockerAvailable = await this.lockerService.isLockerAvailable(
      rentDto.lockerId,
    );
    if (!lockerAvailable) {
      this.logger.error(`Locker ${rentDto.lockerId} is not available`);
      throw new BadRequestException('Locker is not available');
    }

    this.logger.info('Creating new rent with locker');
    const newRent = await this.rentRepository
      .create(rentEntity)
      .then(async (rent) => {
        await this.lockerService.changeOccupied(rent.lockerId, true);
        return await this.rentRepository.findOneOrThrow(rent.id);
      })
      .catch((error) => {
        throw new InternalServerErrorException(
          `Error creating a new Rent`,
          error.message,
        );
      });

    return new RentResponseDto(newRent);
  }

  async update(rentId: UUID, rentDto: RentUpdateDto): Promise<RentResponseDto> {
    const updatedEntity = new RentEntity(
      rentDto.lockerId,
      rentDto.weight,
      rentDto.size,
      rentDto.status,
      rentId
    );

    const rentDb = await this.rentRepository
      .findOneOrThrow(rentId)
      .catch((error) => {
        this.logger.error(`Rent with id ${rentId} not found`);
        throw new NotFoundException(`Rent not found`, error.message);
      });

    const lockerDb = await this.lockerService
      .getLockerInfo(rentDto.lockerId)
      .catch((error) => {
        this.logger.error(`Locker with id ${rentDto.lockerId} not found`);
        throw new NotFoundException(`Locker not found`, error.message);
      });

    if (rentDb.lockerId !== lockerDb.id) {
      //Check if the new locker is available
      const lockerAvailable = await this.lockerService.isLockerAvailable(
        rentDto.lockerId,
      );
      if (!lockerAvailable) {
        this.logger.error(`Locker ${rentDto.lockerId} is not available`);
        throw new BadRequestException('Locker is not available');
      }
    }

    this.logger.info('Updating rent');
    const updatedRent = await this.rentRepository
      .update(updatedEntity)
      .then(async (rent) => {
        await this.lockerService.changeOccupied(rent.lockerId, true);
        return await this.rentRepository.findOneOrThrow(rent.id);
      })
      .catch((error) => {
        throw new InternalServerErrorException(
          `Error updating Rent`,
          error.message,
        );
      });

    return new RentResponseDto(updatedRent);
  }

  async retrieve(rentId: string): Promise<any> {

  }
}
