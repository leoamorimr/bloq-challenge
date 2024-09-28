import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { Uuid } from 'src/decorator/uuid.decorator';
import { RentCreateDto } from 'src/model/dto/rent-create.dto';
import { RentResponseDto } from 'src/model/dto/rent-response.dto';
import { RentUpdateDto } from 'src/model/dto/rent-update.dto';
import { RentService } from 'src/service/rent.service';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post('create')
  async createRent(@Body() rent: RentCreateDto): Promise<RentResponseDto> {
    return await this.rentService.create(rent);
  }

  @Patch('deposit/:rentId')
  async deposit(
    @Uuid('rentId') rentId: UUID,
    @Body() rentDto: RentUpdateDto,
  ): Promise<RentResponseDto> {
    return await this.rentService.deposit(rentId, rentDto);
  }

  @Delete('retrieve/:rentId')
  async retrieve(@Uuid('rentId') rentId: UUID): Promise<object> {
    return await this.rentService.retrieve(rentId);
  }
}
