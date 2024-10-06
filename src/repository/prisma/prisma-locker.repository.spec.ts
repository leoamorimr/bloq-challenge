import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/database/prisma.service";
import { LockerStatus } from "src/model/enum/locker-status.enum";
import { fakeLockEntity, fakeUUID } from "../../../test/mock/fake-locker";
import { PrismaLockerRepository } from "../prisma-locker.repository";

jest.mock("../../database/prisma.service");

describe("PrismaLockerRepository", () => {
  let repository: PrismaLockerRepository;
  let prismaService: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaLockerRepository, PrismaService],
    }).compile();

    repository = module.get<PrismaLockerRepository>(PrismaLockerRepository);
    prismaService = module.get<PrismaService>(
      PrismaService,
    ) as jest.Mocked<PrismaService>;

    Object.defineProperty(prismaService, "locker", {
      value: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findUniqueOrThrow: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
      },
      writable: true,
    });
  });

  describe("create", () => {
    it("should create a new locker", async () => {
      prismaService.locker.create = jest.fn().mockResolvedValue(fakeLockEntity);

      const result = await repository.create(fakeLockEntity);
      expect(result).toEqual(fakeLockEntity);
      expect(prismaService.locker.create).toHaveBeenCalled();
    });
  });

  describe("exists", () => {
    it("should return true if locker exists", async () => {
      prismaService.locker.findUnique = jest
        .fn()
        .mockResolvedValue({ id: fakeUUID });

      const result = await repository.exists(fakeUUID);
      expect(result).toBe(true);
      expect(prismaService.locker.findUnique).toHaveBeenCalledWith({
        where: { id: fakeUUID },
      });
    });

    it("should return false if locker does not exist", async () => {
      prismaService.locker.findUnique = jest.fn().mockResolvedValue(null);

      const result = await repository.exists(fakeUUID);
      expect(result).toBe(false);
      expect(prismaService.locker.findUnique).toHaveBeenCalledWith({
        where: { id: fakeUUID },
      });
    });
  });

  describe("isAvailable", () => {
    it("should return true if locker is available", async () => {
      prismaService.locker.findUnique = jest
        .fn()
        .mockResolvedValue(fakeLockEntity);

      const result = await repository.isAvailable(fakeUUID);
      expect(result).toBe(true);
      expect(prismaService.locker.findUnique).toHaveBeenCalledWith({
        where: { id: fakeUUID },
      });
    });

    it("should return false if locker is not available", async () => {
      prismaService.locker.findUnique = jest.fn().mockResolvedValue({
        id: fakeUUID,
        status: LockerStatus.CLOSED,
      });

      const result = await repository.isAvailable(fakeUUID);
      expect(result).toBe(false);
      expect(prismaService.locker.findUnique).toHaveBeenCalled();
    });
  });

  describe("changeOccupied", () => {
    it("should change locker status to occupied", async () => {
      prismaService.locker.update = jest.fn().mockResolvedValue(fakeLockEntity);

      const result = await repository.changeOccupied(fakeUUID, true);
      expect(result).toEqual(fakeLockEntity);
      expect(prismaService.locker.update).toHaveBeenCalled();
    });

    it("should change locker status to available", async () => {
      prismaService.locker.update = jest.fn().mockResolvedValue(fakeLockEntity);

      const result = await repository.changeOccupied(fakeUUID, false);
      expect(result).toEqual(fakeLockEntity);
      expect(prismaService.locker.update).toHaveBeenCalled();
    });
  });

  describe("findOneOrThrow", () => {
    it("should find a locker by ID or throw an error", async () => {
      prismaService.locker.findUniqueOrThrow = jest
        .fn()
        .mockResolvedValue(fakeLockEntity);

      const result = await repository.findOneOrThrow(fakeUUID);
      expect(result).toEqual(fakeLockEntity);
      expect(prismaService.locker.findUniqueOrThrow).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should update a locker", async () => {
      prismaService.locker.update = jest.fn().mockResolvedValue(fakeLockEntity);

      const { ...updateData } = fakeLockEntity;
      const result = await repository.update(fakeUUID, updateData);
      expect(result).toEqual(fakeLockEntity);
      expect(prismaService.locker.update).toHaveBeenCalled();
    });
  });

  describe("findAll", () => {
    it("should return an array of lockers", async () => {
      const lockerList = [fakeLockEntity];
      prismaService.locker.findMany = jest.fn().mockResolvedValue(lockerList);

      const result = await repository.findAll();
      expect(result).toEqual(lockerList);
      expect(prismaService.locker.findMany).toHaveBeenCalled();
    });
  });
});
