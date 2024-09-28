import { Controller } from '@nestjs/common';
import { LockerService } from 'src/service/locker.service';

@Controller('locker')
export class LockerController {
  constructor(private readonly lockerService: LockerService) {}
}
