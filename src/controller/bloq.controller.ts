import { Body, Controller, Patch, Post } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { Uuid } from 'src/decorator/uuid.decorator';
import { BloqRequestDto } from 'src/model/dto/bloq-create.dto';
import { BloqResponseDto } from 'src/model/dto/bloq-response.dto';
import { BloqUpdateDto } from 'src/model/dto/bloq-update.dto';
import { BloqService } from 'src/service/bloq.service';

@Controller('bloq')
export class BloqController {
  constructor(private readonly bloqService: BloqService) {}

  @Post('create')
  async createBloq(@Body() bloq: BloqRequestDto): Promise<BloqResponseDto> {
    return await this.bloqService.createBloq(bloq);
  }

  @Patch('update/:bloqId')
  async updateBloq(
    @Uuid('bloqId') bloqId: UUID,
    @Body() bloq: BloqUpdateDto,
  ): Promise<BloqResponseDto> {
    return await this.bloqService.updateBloq(bloqId, bloq);
  }
}
