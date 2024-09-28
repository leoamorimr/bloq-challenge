import { Body, Controller, Patch, Post } from "@nestjs/common";
import { UUID } from "node:crypto";
import { isUUId } from "src/decorator/uuid.decorator";
import { LockerCreateDto } from "src/model/dto/locker-create.dto";
import { LockerReponseDto } from "src/model/dto/locker-response.dto";
import { LockerUpdateDto } from "src/model/dto/locker-update.dto";
import { LockerService } from "src/service/locker.service";

@Controller("locker")
export class LockerController {
  constructor(private readonly lockerService: LockerService) {}

  @Patch("update/:lockerId")
  async update(
    @isUUId("lockerId") lockerId: UUID,
    @Body() lockerDto: LockerUpdateDto,
  ): Promise<LockerReponseDto | Error> {
    return await this.lockerService.update(lockerId, lockerDto);
  }

  @Post("create")
  async create(@Body() lockerDto: LockerCreateDto): Promise<LockerReponseDto> {
    return await this.lockerService.create(lockerDto);
  }
}
