import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post
} from '@nestjs/common';
import { UUID } from 'node:crypto';
import { RentCreateDto } from 'src/model/dto/rentCreate.dto';
import { RentResponseDto } from 'src/model/dto/rentResponse.dto';
import { RentService } from 'src/service/rent.service';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) { }

  @Post('create')
  async createRent(@Body() rent: RentCreateDto): Promise<RentResponseDto> {
    console.log("RentController.deposit triggered");
    return await this.rentService.create(rent);
  }

  @Patch('deposit/:rentId')
  async retrieve(@Param('rentId', new ParseUUIDPipe()) rentId: UUID, @Body() rentDto: RentCreateDto): Promise<RentResponseDto> {
    return await this.rentService.deposit(rentId, rentDto);
  }


}
