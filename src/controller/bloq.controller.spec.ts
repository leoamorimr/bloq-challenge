import { HttpException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "node:crypto";
import { BloqRequestDto } from "src/model/dto/bloq-create.dto";
import { BloqResponseDto } from "src/model/dto/bloq-response.dto";
import { BloqUpdateDto } from "src/model/dto/bloq-update.dto";
import { BloqService } from "src/service/bloq.service";
import {
  fakeBloqRequestDto,
  fakeBloqResponseDto,
} from "../../test/mock/bloq";
import { BloqController } from "./bloq.controller";

describe("BloqController", () => {
  let bloqController: BloqController;
  let bloqService: BloqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloqController],
      providers: [
        {
          provide: BloqService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    bloqController = module.get<BloqController>(BloqController);
    bloqService = module.get<BloqService>(BloqService);
  });

  describe("createBloq", () => {
    it("should create a new bloq", async () => {
      const bloqRequestDto: BloqRequestDto =
        fakeBloqRequestDto as BloqRequestDto;
      const bloqResponseDto: BloqResponseDto = fakeBloqResponseDto;

      jest.spyOn(bloqService, "create").mockResolvedValue(bloqResponseDto);

      const result = await bloqController.createBloq(bloqRequestDto);
      expect(result).toEqual(bloqResponseDto);
      expect(bloqService.create).toHaveBeenCalledWith(bloqRequestDto);
    });

    it("should throw an HttpException if creation fails", async () => {
      const bloqRequestDto: BloqRequestDto =
        fakeBloqRequestDto as BloqRequestDto;
      const httpException = new HttpException("Error", 400);

      jest.spyOn(bloqService, "create").mockRejectedValue(httpException);

      await expect(bloqController.createBloq(bloqRequestDto)).rejects.toThrow(
        httpException,
      );
    });
  });

  describe("updateBloq", () => {
    it("should update an existing bloq", async () => {
      const bloqId = randomUUID();
      const bloqUpdateDto: BloqUpdateDto = fakeBloqRequestDto;
      const bloqResponseDto: BloqResponseDto = fakeBloqResponseDto;

      jest.spyOn(bloqService, "update").mockResolvedValue(bloqResponseDto);

      const result = await bloqController.updateBloq(bloqId, bloqUpdateDto);
      expect(result).toEqual(bloqResponseDto);
      expect(bloqService.update).toHaveBeenCalledWith(bloqId, bloqUpdateDto);
    });

    it("should throw an HttpException if update fails", async () => {
      const bloqId = randomUUID();
      const bloqUpdateDto: BloqUpdateDto = fakeBloqRequestDto as BloqUpdateDto;
      const httpException = new HttpException("Error", 400);

      jest.spyOn(bloqService, "update").mockRejectedValue(httpException);

      await expect(
        bloqController.updateBloq(bloqId, bloqUpdateDto),
      ).rejects.toThrow(httpException);
    });
  });
});
