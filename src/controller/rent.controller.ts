import {
  Body,
  Controller,
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
  createRent(@Body() rent: RentCreateDto): Promise<RentResponseDto> {
    console.log("RentController.deposit triggered");
    return this.rentService.create(rent);
  }

  @Patch('retrieve')
  retrieve(rentId: UUID): any {
    return this.rentService.retrieve(rentId);
  }


}
