import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UUID } from 'node:crypto';
import { RentCreateDto } from 'src/model/dto/rentCreate.dto';
import { RentResponseDto } from 'src/model/dto/rentResponse.dto';
import { RentUpdateDto } from 'src/model/dto/rentUpdate.dto';
import { RentService } from 'src/service/rent.service';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) { }

  @Post('create')
  async createRent(@Body() rent: RentCreateDto): Promise<RentResponseDto> {
    console.log('RentController.deposit triggered');
    return await this.rentService.create(rent);
  }

  @Patch('update/:rentId')
  async update(
    @Param('rentId', new ParseUUIDPipe()) rentId: UUID,
    @Body() rentDto: RentUpdateDto,
  ): Promise<RentResponseDto> {
    return await this.rentService.update(rentId, rentDto);
  }
}
