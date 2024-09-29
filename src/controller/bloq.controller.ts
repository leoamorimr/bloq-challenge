import { Body, Controller, HttpException, Patch, Post } from "@nestjs/common";
import { UUID } from "node:crypto";
import { isUUId } from "src/decorator/uuid.decorator";
import { BloqCreateDto } from "src/model/dto/bloq-create.dto";
import { BloqResponseDto } from "src/model/dto/bloq-response.dto";
import { BloqUpdateDto } from "src/model/dto/bloq-update.dto";
import { BloqService } from "src/service/bloq.service";

@Controller("bloq")
export class BloqController {
  constructor(private readonly bloqService: BloqService) {}

  @Post("create")
  async createBloq(
    @Body() bloq: BloqCreateDto,
  ): Promise<BloqResponseDto | HttpException> {
    return await this.bloqService.create(bloq);
  }

  @Patch("update/:bloqId")
  async updateBloq(
    @isUUId("bloqId") bloqId: UUID,
    @Body() bloq: BloqUpdateDto,
  ): Promise<BloqResponseDto | HttpException> {
    return await this.bloqService.update(bloqId, bloq);
  }
}
