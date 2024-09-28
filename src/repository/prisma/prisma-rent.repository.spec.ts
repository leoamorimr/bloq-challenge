import { Test, TestingModule } from "@nestjs/testing";
import { isNil, omitBy } from "lodash";
import { PrismaService } from "src/database/prisma.service";
import { fakeUUID } from "../../../test/mock/fake-locker";
import { fakeRentEntity } from "../../../test/mock/rent";
import { PrismaRentRepository } from "./prisma-rent.repository";

jest.mock("../../database/prisma.service");

describe("PrismaRentRepository", () => {
  let repository: PrismaRentRepository;
  let prismaService: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaRentRepository, PrismaService],
    }).compile();

    repository = module.get<PrismaRentRepository>(PrismaRentRepository);
    prismaService = module.get<PrismaService>(
      PrismaService,
    ) as jest.Mocked<PrismaService>;

    Object.defineProperty(prismaService, "rent", {
      value: {
        create: jest.fn(),
        findOneOrThrow: jest.fn(),
        exists: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      writable: true,
    });
  });

  describe("exists", () => {
    it("should return true if rent exists", async () => {
      prismaService.rent.findUnique = jest
        .fn()
        .mockResolvedValue({ id: fakeUUID });

      const result = await repository.exists(fakeUUID);
      expect(result).toBe(true);
      expect(prismaService.rent.findUnique).toHaveBeenCalledWith({
        where: { id: fakeUUID },
      });
    });

    it("should return false if rent does not exist", async () => {
      prismaService.rent.findUnique = jest.fn().mockResolvedValue(null);

      const result = await repository.exists(fakeUUID);
      expect(result).toBe(false);
      expect(prismaService.rent.findUnique).toHaveBeenCalledWith({
        where: { id: fakeUUID },
      });
    });
  });

  describe("update", () => {
    it("should update a rent", async () => {
      prismaService.rent.update = jest.fn().mockResolvedValue(fakeRentEntity);

      const result = await repository.update(fakeUUID, fakeRentEntity);
      expect(result).toEqual(fakeRentEntity);
      expect(prismaService.rent.update).toHaveBeenCalledWith({
        data: omitBy(
          {
            lockerId: fakeRentEntity.lockerId,
            weight: fakeRentEntity.weight,
            size: fakeRentEntity.size,
            status: fakeRentEntity.status,
          },
          isNil,
        ),
        where: { id: fakeRentEntity.id },
      });
    });
  });

  describe("delete", () => {
    it("should delete a rent", async () => {
      prismaService.rent.delete = jest.fn().mockResolvedValue({});

      await repository.delete(fakeUUID);
      expect(prismaService.rent.delete).toHaveBeenCalledWith({
        where: { id: fakeUUID },
      });
    });
  });
});
