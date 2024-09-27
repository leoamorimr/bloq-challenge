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
import { LockerService } from 'src/service/locker.service';

@Controller('locker')
export class LockerController {
  constructor(private readonly lockerService: LockerService) { }

  @Get()
  getLockers(): any {
    return this.lockerService.get();
  }

  @Get(':id')
  getLocker(@Param('id', new ParseUUIDPipe()) id: UUID): any {
    return this.lockerService.getOne(id);
  }

  @Post('create')
  createLocker(@Body() body: any): any {
    return this.lockerService.create(body);
  }

  @Patch('update/:id')
  updateLocker(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() body: any,
  ): any {
    return this.lockerService.update(id, body);
  }

  @Delete('delete/:id')
  deleteLocker(@Param('id', new ParseUUIDPipe()) id: UUID): any {
    return this.lockerService.delete(id);
  }
}
