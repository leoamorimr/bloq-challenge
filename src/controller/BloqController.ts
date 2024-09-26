import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UUID } from 'node:crypto';
import { BloqRequestDto } from 'src/model/dto/BloqRequestDto';
import { BloqResponseDto } from 'src/model/dto/BloqResponseDto';
import { BloqService } from 'src/service/BloqService';

@Controller('bloq')
export class BloqController {
  constructor(private readonly bloqService: BloqService) { }

  @Get()
  getBloqs(): BloqResponseDto[] {
    return this.bloqService.get();
  }

  @Get(':id')
  getBloq(@Param('id', new ParseUUIDPipe()) id: UUID): BloqResponseDto {
    return this.bloqService.getOne(id);
  }

  @Post('create')
  createBloq(@Body() bloq: BloqRequestDto): BloqResponseDto {
    return this.bloqService.create(bloq);
  }

  @Patch('update/:id')
  updateBloq(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() bloq: BloqRequestDto,
  ): BloqResponseDto {
    return this.bloqService.update(id, bloq);
  }

  @Delete('delete/:id')
  deleteBloq(@Param('id', new ParseUUIDPipe()) id: UUID): BloqResponseDto {
    return this.bloqService.delete(id);
  }
}
