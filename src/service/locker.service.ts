import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { LockerCreateDto } from "src/model/dto/locker-create.dto";
import { LockerResponseDto } from "src/model/dto/locker-response.dto";
import { LockerUpdateDto } from "src/model/dto/locker-update.dto";
import { LockerEntity } from "src/model/entity/locker.entity";
import { LockerStatus } from "src/model/enum/locker-status.enum";
import { PrismaLockerRepository } from "../repository/prisma/prisma-locker.repository";
import { BloqService } from "./bloq.service";

@Injectable()
export class LockerService {
  constructor(
    private readonly lockerRepository: PrismaLockerRepository,
    private readonly bloqService: BloqService,
    private readonly logger: PinoLogger,
  ) {}

  async isLockerAvailable(lockerId: string): Promise<boolean> {
    this.logger.info(`Checking if locker: ${lockerId} is available`);
    const isAvailable = await this.lockerRepository.isAvailable(lockerId);

    return isAvailable;
  }

  async lockerExists(lockerId: string): Promise<boolean | NotFoundException> {
    this.logger.info("Checking if locker exists");
    if (!(await this.lockerRepository.exists(lockerId))) {
      this.logger.error(`Locker ${lockerId} does not exist`);
      throw new NotFoundException("Locker does not exist");
    }
    return true;
  }

  async changeOccupied(
    lockerId: string,
    isOccupied?: boolean,
  ): Promise<LockerEntity> {
    this.logger.info(
      `Changing locker ${lockerId} occupied status to: ${isOccupied}`,
    );
    return await this.lockerRepository.changeOccupied(lockerId, isOccupied);
  }

  async findOneOrThrow(lockerId: string): Promise<LockerEntity> {
    this.logger.info("Getting locker info");
    return await this.lockerRepository.findOneOrThrow(lockerId);
  }

  async update(
    lockerId: string,
    lockerDto: LockerUpdateDto,
  ): Promise<LockerResponseDto | Error> {
    const lockerEntity = new LockerEntity(
      lockerDto?.bloqId,
      lockerDto?.status,
      lockerDto?.isOccupied,
    );

    await this.lockerExists(lockerId).catch((error) => {
      throw error;
    });

    const isLockerAvailable =
      lockerDto.isOccupied === false || lockerDto.status === LockerStatus.OPEN;

    // Check if locker is occupied. If so, thats not possible to update occupied status
    if (isLockerAvailable && !(await this.isLockerAvailable(lockerId))) {
      this.logger.error(`Locker ${lockerId} is not available`);
      throw new BadRequestException(
        "Locker is occupied. Please retrieve it first",
      );
    }

    this.logger.info("Updating locker");
    const updatedLocker = await this.lockerRepository
      .update(lockerId, lockerEntity)
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

    return new LockerResponseDto(updatedLocker);
  }

  async create(lockerDto: LockerCreateDto): Promise<LockerResponseDto> {
    this.logger.info("Creating new Locker");
    await this.bloqService.get(lockerDto.bloqId).catch((error) => {
      throw error;
    });

    const createdLocker = await this.lockerRepository
      .create(
        new LockerEntity(
          lockerDto.bloqId,
          lockerDto.status,
          lockerDto.isOccupied,
        ),
      )
      .then(async (locker) => {
        return await this.lockerRepository.findOneOrThrow(locker.id);
      })
      .catch((error) => {
        throw error;
      });

    return new LockerResponseDto(createdLocker);
  }

  async findAll(): Promise<LockerResponseDto[]> {
    const lockers: LockerEntity[] = await this.lockerRepository.findAll();
    return lockers.map((locker) => new LockerResponseDto(locker));
  }
}
