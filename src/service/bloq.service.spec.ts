import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PinoLogger } from "nestjs-pino";

import {
  fakeBloqEntity,
  fakeBloqRequestDto,
  fakeBloqResponseDto,
} from "../../test/mock/bloq";
import { fakeUUID } from "../../test/mock/fake-locker";
import { BloqCreateDto } from "../model/dto/bloq-create.dto";
import { BloqResponseDto } from "../model/dto/bloq-response.dto";
import { BloqUpdateDto } from "../model/dto/bloq-update.dto";
import { BloqEntity } from "../model/entity/bloq.entity";
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

  describe("create", () => {
    it("should create a new bloq entity", async () => {
      jest.spyOn(bloqRepository, "create").mockResolvedValue(fakeBloqEntity);

      const result = await service.create(fakeBloqRequestDto as BloqCreateDto);

      expect(result).toEqual(fakeBloqResponseDto);
      expect(bloqRepository.create).toHaveBeenCalledWith(
        expect.any(BloqEntity),
      );
    });

    it("should handle errors when creating a new bloq entity", async () => {
      jest
        .spyOn(bloqRepository, "create")
        .mockRejectedValue(new Error("Error creating bloq"));

      await expect(
        service.create(fakeBloqRequestDto as BloqCreateDto),
      ).rejects.toThrow("Error creating bloq");
      expect(bloqRepository.create).toHaveBeenCalledWith(
        expect.any(BloqEntity),
      );
    });
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
