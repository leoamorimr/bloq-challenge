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
import { RentService } from 'src/service/RentService';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) { }

  @Get()
  getRents(): any {
    return this.rentService.get();
  }

  @Get(':id')
  getRent(@Param('id', new ParseUUIDPipe()) id: UUID): any {
    return this.rentService.getOne(id);
  }

  @Post('create')
  createRent(@Body() body: any): any {
    return this.rentService.create(body);
  }

  @Patch('update/:id')
  updateRent(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() body: any,
  ): any {
    return this.rentService.update(id, body);
  }

  @Delete('delete/:id')
  deleteRent(@Param('id', new ParseUUIDPipe()) id: UUID): any {
    return this.rentService.delete(id);
  }
}
