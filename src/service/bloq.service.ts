import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { BloqRequestDto } from 'src/model/dto/bloqCreate.dto';
import { BloqResponseDto } from 'src/model/dto/bloqResponse.dto';
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
}
