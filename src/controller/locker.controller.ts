import { Body, Controller, Patch, Post } from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UUID } from "node:crypto";
import { isUUId } from "src/decorator/uuid.decorator";
import { LockerCreateDto } from "src/model/dto/locker-create.dto";
import { LockerResponseDto } from "src/model/dto/locker-response.dto";
import { LockerUpdateDto } from "src/model/dto/locker-update.dto";
import { LockerService } from "src/service/locker.service";

@ApiTags("locker")
@Controller("locker")
export class LockerController {
  constructor(private readonly lockerService: LockerService) {}

  @Patch("update/:lockerId")
  @ApiOperation({ summary: "Update an existing locker" })
  @ApiResponse({
    status: 200,
    description: "The locker has been successfully updated.",
    type: LockerResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiParam({ name: "lockerId", description: "UUID of the locker to update" })
  @ApiBody({ type: LockerUpdateDto })
  async update(
    @isUUId("lockerId") lockerId: UUID,
    @Body() lockerDto: LockerUpdateDto,
  ): Promise<LockerResponseDto | Error> {
    return await this.lockerService.update(lockerId, lockerDto);
  }

  @Post("create")
  @ApiOperation({ summary: "Create a new locker" })
  @ApiResponse({
    status: 201,
    description: "The locker has been successfully created.",
    type: LockerResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiBody({ type: LockerCreateDto })
  async create(@Body() lockerDto: LockerCreateDto): Promise<LockerResponseDto> {
    return await this.lockerService.create(lockerDto);
  }
}
