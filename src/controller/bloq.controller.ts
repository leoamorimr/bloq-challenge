import { Body, Controller, Post } from '@nestjs/common';
import { BloqRequestDto } from 'src/model/dto/bloqCreate.dto';
import { BloqResponseDto } from 'src/model/dto/bloqResponse.dto';
import { BloqService } from 'src/service/bloq.service';

@Controller('bloq')
export class BloqController {
  constructor(private readonly bloqService: BloqService) {}

  // @Get()
  // async getBloqs(): Promise<BloqResponseDto[]> {
  //   return await this.bloqService.getAllBloqs();
  // }

  // @Get(':id')
  // async getBloq(@Param('id', new ParseUUIDPipe()) id: UUID): Promise<BloqResponseDto> {
  //   return await this.bloqService.getBloqById(id);
  // }

  @Post('create')
  async createBloq(@Body() bloq: BloqRequestDto): Promise<BloqResponseDto> {
    return await this.bloqService.createBloq(bloq);
  }

  // @Patch('update/:id')
  // async updateBloq(
  //   @Param('id', new ParseUUIDPipe()) id: UUID,
  //   @Body() bloq: BloqRequestDto,
  // ): Promise<BloqResponseDto> {
  //   return await this.bloqService.updateBloq(id, bloq);
  // }

  // @Delete('delete/:id')
  // deleteBloq(@Param('id', new ParseUUIDPipe()) id: UUID): string {
  //   this.bloqService.deleteBloq(id);
  //   return "Bloq deleted";
  // }
}
