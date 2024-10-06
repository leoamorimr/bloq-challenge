import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { UUID } from "node:crypto";
import { BloqCreateDto } from "src/model/dto/bloq-create.dto";
import { BloqResponseDto } from "src/model/dto/bloq-response.dto";
import { BloqUpdateDto } from "src/model/dto/bloq-update.dto";
import { BloqEntity } from "src/model/entity/bloq.entity";
import { PrismaBloqRepository } from "../repository/prisma/prisma-bloq.repository";

@Injectable()
export class BloqService {
  constructor(
    private readonly bloqRepository: PrismaBloqRepository,
    private readonly logger: PinoLogger,
  ) {}

  async create(bloq: BloqCreateDto): Promise<BloqResponseDto> {
    this.logger.info("Creating new bloq");
    const createdBloq = await this.bloqRepository.create(
      new BloqEntity(bloq.title, bloq.address),
    );
    const bloqResponse = new BloqResponseDto(createdBloq);
    return bloqResponse;
  }

  async update(
    bloqId: UUID,
    bloqDto: BloqUpdateDto,
  ): Promise<BloqResponseDto | HttpException> {
    await this.bloqRepository.findUniqueOrThrow(bloqId).catch(() => {
      this.logger.error(`Bloq ${bloqId} not found`);
      throw new NotFoundException(`Bloq not found`);
    });

    const bloqEntity = new BloqEntity(bloqDto.title, bloqDto.address, bloqId);

    this.logger.info(`Updating bloq ${bloqId}`);
    const updatedBloq = await this.bloqRepository
      .update(bloqId, bloqEntity)
      .then(async () => {
        return await this.bloqRepository.findUnique(bloqId);
      });

    return new BloqResponseDto(updatedBloq);
  }

  async get(blockId: string): Promise<BloqEntity | HttpException> {
    this.logger.info("Getting bloq info");
    return await this.bloqRepository.findUniqueOrThrow(blockId).catch(() => {
      throw new NotFoundException("Bloq not found");
    });
  }

  async findAll(): Promise<BloqResponseDto[]> {
    this.logger.info("Getting all bloqs");
    const bloqs = await this.bloqRepository.findAll();
    return bloqs.map((bloq) => new BloqResponseDto(bloq));
  }
}
