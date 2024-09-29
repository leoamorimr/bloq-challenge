import {
  Body,
  Controller,
  Delete,
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
import { RentCreateDto } from "src/model/dto/rent-create.dto";
import { RentResponseDto } from "src/model/dto/rent-response.dto";
import { RentUpdateDto } from "src/model/dto/rent-update.dto";
import { RentService } from "src/service/rent.service";

@ApiTags("rent")
@Controller("rent")
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post("create")
  @ApiOperation({ summary: "Create a new rent" })
  @ApiResponse({
    status: 201,
    description: "The rent has been successfully created.",
    type: RentResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiBody({ type: RentCreateDto })
  async createRent(@Body() rent: RentCreateDto): Promise<RentResponseDto> {
    return await this.rentService.create(rent);
  }

  @Patch("deposit/:rentId")
  @ApiOperation({ summary: "Deposit rent" })
  @ApiResponse({
    status: 200,
    description: "The rent has been successfully deposited.",
    type: RentResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiParam({ name: "rentId", description: "UUID of the rent to deposit" })
  @ApiBody({ type: RentUpdateDto })
  async deposit(
    @isUUId("rentId") rentId: UUID,
    @Body() rentDto: RentUpdateDto,
  ): Promise<RentResponseDto | HttpException> {
    return await this.rentService.deposit(rentId, rentDto);
  }

  @Delete("retrieve/:rentId")
  @ApiOperation({ summary: "Retrieve rent" })
  @ApiResponse({
    status: 200,
    description: "The rent has been successfully retrieved.",
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiParam({ name: "rentId", description: "UUID of the rent to retrieve" })
  async retrieve(
    @isUUId("rentId") rentId: UUID,
  ): Promise<object | HttpException> {
    return await this.rentService.retrieve(rentId);
  }
}
