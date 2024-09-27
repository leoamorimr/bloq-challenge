import { Injectable, NotFoundException } from '@nestjs/common';
import { LockerRepository } from 'src/repository/locker.repository';

@Injectable()
export class LockerService {
  constructor(private readonly lockerRepository: LockerRepository) { }


  async isLockerAvailable(lockerId: string): Promise<boolean> {
    const lockerExist = await this.lockerExists(lockerId);

    // Locker not found in DB
    if (!lockerExist) {
      throw new NotFoundException('Locker does not exist');
    }

    console.log(`Checking if locker: ${lockerId} is available`);
    const isAvailable = await this.lockerRepository.isAvailable(lockerId);

    return isAvailable;
  }

  async lockerExists(lockerId: string): Promise<boolean> {
    console.log("Checking if locker exists");
    return this.lockerRepository.exists(lockerId);
  }

  async changeOccupied(lockerId: string, isOccupied: boolean): Promise<any> {
    console.log(`Changing locker ${lockerId} occupied status to: ${isOccupied}`);
    return this.lockerRepository.changeOccupied(lockerId, isOccupied);
  }


}
