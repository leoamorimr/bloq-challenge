import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { BloqRequestDto } from 'src/model/dto/bloqCreate.dto';
import { BloqResponseDto } from 'src/model/dto/bloqResponse.dto';
import { BloqEntity } from 'src/model/entities/bloq.entity';
import { BloqRepository } from 'src/repository/bloq.repository';

@Injectable()
export class BloqService {
  constructor(
    private readonly bloqRepository: BloqRepository,
    @InjectPinoLogger(BloqService.name) private readonly logger: PinoLogger) { }

  async createBloq(bloq: BloqRequestDto): Promise<BloqResponseDto> {
    this.logger.info("Creating new bloq");
    const createdBloq = await this.bloqRepository.create(new BloqEntity(bloq.title, bloq.address));
    const bloqResponse = new BloqResponseDto(createdBloq.title, createdBloq.address, createdBloq.lockers);
    return bloqResponse;
  }

}
