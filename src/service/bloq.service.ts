import { Injectable } from '@nestjs/common';
import { BloqRequestDto } from 'src/model/dto/bloqCreate.dto';
import { BloqResponseDto } from 'src/model/dto/bloqResponse.dto';
import { BloqEntity } from 'src/model/entities/bloq.entity';
import { BloqRepository } from 'src/repository/bloq.repository';

@Injectable()
export class BloqService {
  constructor(private readonly bloqRepository: BloqRepository) { }

  // async getAllBloqs(): Promise<BloqResponseDto[]> {
  //   const bloqs = this.bloqRepository.findMany();
  //   return [];
  // }

  // async getBloqById(id: UUID): Promise<BloqResponseDto> {
  //   const bloq = await this.bloqRepository.findUnique({ where: { id } });

  //   return;
  // }

  async createBloq(bloq: BloqRequestDto): Promise<BloqResponseDto> {
    console.log("Creating new bloq");
    const createdBloq = await this.bloqRepository.create(new BloqEntity(bloq.title, bloq.address));
    const bloqResponse = new BloqResponseDto(createdBloq.title, createdBloq.address, createdBloq.lockers);
    return bloqResponse;
  }

  // async updateBloq(id: UUID, bloq: BloqRequestDto): Promise<BloqResponseDto> {
  //   const updatedBloq = await this.bloqRepository.update(id, null);
  //   return;
  // }

  // async deleteBloq(id: UUID): Promise<void> {
  //   await this.bloqRepository.delete(null);
  // }
}
