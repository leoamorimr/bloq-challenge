import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UUID } from "node:crypto";
import { isUUId } from "src/decorator/uuid.decorator";
import { BloqCreateDto } from "src/model/dto/bloq-create.dto";
import { BloqResponseDto } from "src/model/dto/bloq-response.dto";
import { BloqUpdateDto } from "src/model/dto/bloq-update.dto";
import { BloqService } from "src/service/bloq.service";

@ApiTags("bloq")
@Controller("bloq")
export class BloqController {
  constructor(private readonly bloqService: BloqService) {}

  @Post("create")
  @ApiOperation({ summary: "Create a new bloq" })
  @ApiResponse({
    status: 201,
    description: "The bloq has been successfully created.",
    type: BloqResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiBody({ type: BloqCreateDto })
  async createBloq(
    @Body() bloq: BloqCreateDto,
  ): Promise<BloqResponseDto | HttpException> {
    return await this.bloqService.create(bloq);
  }

  @Patch("update/:bloqId")
  @ApiOperation({ summary: "Update an existing bloq" })
  @ApiResponse({
    status: 200,
    description: "The bloq has been successfully updated.",
    type: BloqResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiParam({ name: "bloqId", description: "UUID of the bloq to update" })
  @ApiBody({ type: BloqUpdateDto })
  async updateBloq(
    @isUUId("bloqId") bloqId: UUID,
    @Body() bloq: BloqUpdateDto,
  ): Promise<BloqResponseDto | HttpException> {
    return await this.bloqService.update(bloqId, bloq);
  }

  @Get()
  @ApiOperation({ summary: "List all bloqs" })
  @ApiResponse({
    status: 200,
    description: "List of all bloqs",
    type: [BloqResponseDto],
  })
  async findAll(): Promise<BloqResponseDto[]> {
    return await this.bloqService.findAll();
  }
}
