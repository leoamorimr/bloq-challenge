import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PinoLogger } from "nestjs-pino";
import { LockerRepository } from "src/repository/locker.repository";
import {
  fakeLockEntity,
  fakeLockRequestDto,
} from "../../test/mock/fake-locker";
import { LockerReponseDto } from "../model/dto/locker-response.dto";
import { LockerUpdateDto } from "../model/dto/locker-update.dto";
import { BloqService } from "./bloq.service";
import { LockerService } from "./locker.service";

describe("LockerService", () => {
  let service: LockerService;
  let lockerRepository: LockerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LockerService,
        {
          provide: LockerRepository,
          useValue: {
            findOneOrThrow: jest.fn(),
            isAvailable: jest.fn(),
            exists: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: BloqService,
          useValue: {
            get: jest.fn(),
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

    service = module.get<LockerService>(LockerService);
    lockerRepository = module.get<LockerRepository>(LockerRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("isLockerAvailable", () => {
    it("should return true if locker is available", async () => {
      jest
        .spyOn(lockerRepository, "findOneOrThrow")
        .mockResolvedValue(fakeLockEntity);

      jest.spyOn(lockerRepository, "isAvailable").mockResolvedValue(true);
      const result = await service.isLockerAvailable("any-uuid");
      expect(result).toBe(true);
    });
  });

  describe("lockerExists", () => {
    it("should return true if locker exists", async () => {
      jest.spyOn(lockerRepository, "exists").mockResolvedValue(true);
      const result = await service.lockerExists("any-uuid");
      expect(result).toBe(true);
    });

    it("should throw NotFoundException if locker does not exist", async () => {
      jest
        .spyOn(lockerRepository, "findOneOrThrow")
        .mockRejectedValue(new NotFoundException());
      await expect(service.lockerExists("lockerId")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("findOneOrThrow", () => {
    it("should return locker entity", async () => {
      jest
        .spyOn(lockerRepository, "findOneOrThrow")
        .mockResolvedValue(fakeLockEntity);
      const result = await service.findOneOrThrow("any-uuid");
      expect(result).toBe(fakeLockEntity);
    });
  });

  describe("update", () => {
    it("should update locker, change to occupied and return response DTO", async () => {
      fakeLockEntity.isOccupied = false;
      jest.spyOn(service, "lockerExists").mockResolvedValue(true);
      jest.spyOn(service, "isLockerAvailable").mockResolvedValue(true);
      jest.spyOn(lockerRepository, "update").mockResolvedValue(fakeLockEntity);
      jest.spyOn(service, "changeOccupied").mockResolvedValue(fakeLockEntity);
      jest
        .spyOn(lockerRepository, "findOneOrThrow")
        .mockResolvedValue(fakeLockEntity);

      const result = await service.update(
        "any-uuid",
        fakeLockRequestDto as LockerUpdateDto,
      );
      expect(service.changeOccupied).toHaveBeenCalled();
      expect(result).toEqual(expect.any(LockerReponseDto));
    });

    it("should throw BadRequestException if locker is occupied", async () => {
      fakeLockEntity.isOccupied = true;
      jest.spyOn(service, "lockerExists").mockResolvedValue(true);

      await expect(
        service.update("any-uuid", fakeLockRequestDto as LockerUpdateDto),
      ).rejects.toThrow(BadRequestException);
    });

    it("should throw BadRequestException if locker is not available", async () => {
      fakeLockEntity.isOccupied = false;
      jest.spyOn(service, "lockerExists").mockResolvedValue(true);
      jest.spyOn(service, "isLockerAvailable").mockResolvedValue(false);

      await expect(
        service.update("any-uuid", fakeLockRequestDto as LockerUpdateDto),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
