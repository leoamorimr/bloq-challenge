import { Injectable } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { BloqRequestDto } from 'src/model/dto/BloqRequestDto';
import { BloqResponseDto } from 'src/model/dto/BloqResponseDto';

@Injectable()
export class BloqService {
  constructor() {}

  get(): BloqResponseDto[] {
    //Implement logic here
    return [];
  }

  getOne(id: UUID): BloqResponseDto {
    //Implement logic here
    return;
  }

  create(bloq: BloqRequestDto): BloqResponseDto {
    //Implement logic here
    return;
  }

  update(id: UUID, bloq: BloqRequestDto): BloqResponseDto {
    //Implement logic here
    return;
  }

  delete(id: UUID): BloqResponseDto {
    //Implement logic here
    return;
  }
}
