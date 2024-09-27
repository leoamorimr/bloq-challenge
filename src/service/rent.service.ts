import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { RentCreateDto } from 'src/model/dto/rentCreate.dto';
import { RentResponseDto } from 'src/model/dto/rentResponse.dto';
import { RentEntity } from 'src/model/entities/rent.entity';
import { toRentStatus } from 'src/model/enum/rentStatus.enum';
import { RentRepository } from 'src/repository/rent.repository';
import { LockerService } from './locker.service';

@Injectable()
export class RentService {
  constructor(
    private readonly rentRepository: RentRepository,
    private readonly lockerService: LockerService
  ) { }

  async create(rentDto: RentCreateDto): Promise<RentResponseDto> {
    console.log("Creating new rent");

    // Convert DTO to entity
    const rentEntity = new RentEntity(
      rentDto.lockerId,
      rentDto.weight,
      rentDto.size,
      rentDto.status
    );

    // Save new rent without locker 
    if (!rentDto.lockerId) {
      const newRent = await this.rentRepository.create(rentEntity);

      return new RentResponseDto(
        newRent.weight,
        newRent.size,
        toRentStatus(newRent.status),
        newRent.locker,
        newRent.id
      );

    }

    const lockerAvailable = await this.lockerService.isLockerAvailable(rentDto.lockerId);
    if (!lockerAvailable) {
      console.error(`Locker ${rentDto.lockerId} is not available`);
      throw new BadRequestException('Locker is not available');
    }

    console.log("Creating new rent with locker");
    const newRent = await this.rentRepository.create(rentEntity)
      .then(async (rent) => {
        await this.lockerService.changeOccupied(rent.lockerId, true);
        return await this.rentRepository.findOneOrThrow(rent.id);
      })
      .catch((error) => { throw new InternalServerErrorException(`Error creating a new Rent`, error.message) });

    return new RentResponseDto(
      newRent.weight,
      newRent.size,
      toRentStatus(newRent.status),
      newRent.locker,
      newRent.id
    );
  }


  async deposit(rentId: UUID, rentDto: RentCreateDto): Promise<RentResponseDto> {
    // Check if rent exists
    const rentEntity = await this.rentRepository.findOneOrThrow(rentId)
      .catch((error) => {
        console.error(`Rent with id ${rentId} not found`,);
        throw new NotFoundException(`Rent with id ${rentId} not found`, error.message)
      });

    return
  }

  async retrieve(rentId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

}
