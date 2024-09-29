import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PinoLogger } from "nestjs-pino";

import { fakeBloqEntity, fakeBloqRequestDto } from "../../test/mock/bloq";
import { fakeUUID } from "../../test/mock/fake-locker";
import { BloqResponseDto } from "../model/dto/bloq-response.dto";
import { BloqUpdateDto } from "../model/dto/bloq-update.dto";
import { BloqRepository } from "../repository/bloq.repository";
import { BloqService } from "./bloq.service";

describe("BloqService", () => {
  let service: BloqService;
  let bloqRepository: jest.Mocked<BloqRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BloqService,
        {
          provide: BloqRepository,
          useValue: {
            findUniqueOrThrow: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: PinoLogger,
          useValue: {
            info: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BloqService>(BloqService);
    bloqRepository = module.get<BloqRepository>(
      BloqRepository,
    ) as jest.Mocked<BloqRepository>;
  });

  describe("get", () => {
    it("should return a BloqEntity if found", async () => {
      bloqRepository.findUniqueOrThrow.mockResolvedValue(fakeBloqEntity);

      const result = await service.get(fakeUUID);
      expect(result).toEqual(fakeBloqEntity);
      expect(bloqRepository.findUniqueOrThrow).toHaveBeenCalledWith(fakeUUID);
    });

    it("should throw NotFoundException if BloqEntity is not found", async () => {
      bloqRepository.findUniqueOrThrow.mockRejectedValue(
        new Error("Bloq not found"),
      );

      await expect(service.get(fakeUUID)).rejects.toThrow(NotFoundException);
      expect(bloqRepository.findUniqueOrThrow).toHaveBeenCalledWith(fakeUUID);
    });
  });

  describe("update", () => {
    it("should update a BloqEntity if found", async () => {
      bloqRepository.findUniqueOrThrow.mockResolvedValue(fakeBloqEntity);
      bloqRepository.update.mockResolvedValue(fakeBloqEntity);
      bloqRepository.findOne.mockResolvedValue(fakeBloqEntity);

      const result = await service.update(fakeUUID, fakeBloqEntity);
      expect(result).toEqual(new BloqResponseDto(fakeBloqEntity));
      expect(bloqRepository.findUniqueOrThrow).toHaveBeenCalledWith(fakeUUID);
      expect(bloqRepository.update).toHaveBeenCalled();
      expect(bloqRepository.findOne).toHaveBeenCalledWith(fakeUUID);
    });

    it("should throw NotFoundException if BloqEntity is not found", async () => {
      bloqRepository.findUniqueOrThrow.mockRejectedValue(
        new Error("Bloq not found"),
      );

      await expect(
        service.update(fakeUUID, fakeBloqRequestDto as BloqUpdateDto),
      ).rejects.toThrow(NotFoundException);
      expect(bloqRepository.findUniqueOrThrow).toHaveBeenCalledWith(fakeUUID);
    });
  });
});
