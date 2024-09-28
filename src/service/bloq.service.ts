import { Injectable, NotFoundException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { UUID } from 'node:crypto';
import { BloqRequestDto } from 'src/model/dto/bloq-create.dto';
import { BloqResponseDto } from 'src/model/dto/bloq-response.dto';
import { BloqUpdateDto } from 'src/model/dto/bloq-update.dto';
import { BloqEntity } from 'src/model/entity/bloq.entity';
import { BloqRepository } from 'src/repository/bloq.repository';

@Injectable()
export class BloqService {
  constructor(
    private readonly bloqRepository: BloqRepository,
    private readonly logger: PinoLogger,
  ) { }

  async createBloq(bloq: BloqRequestDto): Promise<BloqResponseDto> {
    this.logger.info('Creating new bloq');
    const createdBloq = await this.bloqRepository.create(
      new BloqEntity(bloq.title, bloq.address),
    );
    const bloqResponse = new BloqResponseDto(createdBloq);
    return bloqResponse;
  }

  async updateBloq(bloqId: UUID, bloqDto: BloqUpdateDto): Promise<BloqResponseDto> {
    const bloqExists = await this.bloqRepository.findOne(bloqId);
    if (!bloqExists) {
      this.logger.error(`Bloq ${bloqId} not found`);
      throw new NotFoundException(`Bloq not found`);
    }

    const bloqEntity = new BloqEntity(bloqDto.title, bloqDto.address);

    this.logger.info(`Updating bloq ${bloqId}`);
    const updatedBloq = await this.bloqRepository.update(bloqEntity)
      .then(async (bloq) => {
        return await this.bloqRepository.findOne(bloqId);
      });

    return new BloqResponseDto(updatedBloq);
  }
}
