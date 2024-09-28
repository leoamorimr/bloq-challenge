import { Body, Controller, Patch } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { Uuid } from 'src/decorator/uuid.decorator';
import { LockerReponseDto } from 'src/model/dto/locker-response.dto';
import { LockerUpdateDto } from 'src/model/dto/locker-update.dto';
import { LockerService } from 'src/service/locker.service';

@Controller('locker')
export class LockerController {
  constructor(private readonly lockerService: LockerService) {}

  @Patch('update/:lockerId')
  async update(
    @Uuid('lockerId') lockerId: UUID,
    @Body() lockerDto: LockerUpdateDto,
  ): Promise<LockerReponseDto> {
    return await this.lockerService.update(lockerId, lockerDto);
  }
}
