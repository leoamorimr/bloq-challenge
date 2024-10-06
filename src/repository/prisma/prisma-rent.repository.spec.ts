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
        findAll: jest.fn(),
      },
      writable: true,
    });
  });

  describe("create", () => {
    it("should create a rent entity", async () => {
      (prismaService.rent.create as jest.Mock).mockResolvedValue(
        fakeRentEntity,
      );

      const result = await repository.create(fakeRentEntity);

      expect(prismaService.rent.create).toHaveBeenCalledWith({
        data: {
          id: expect.any(String),
          lockerId: fakeRentEntity.lockerId,
          weight: fakeRentEntity.weight,
          size: fakeRentEntity.size,
          status: fakeRentEntity.status,
        },
        include: {
          locker: true,
        },
      });
      expect(result).toEqual(fakeRentEntity);
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

  describe("findAll", () => {
    it("should return an array of rents", async () => {
      const rentList = [fakeRentEntity];
      prismaService.rent.findMany = jest.fn().mockResolvedValue(rentList);

      const result = await repository.findAll();
      expect(result).toEqual(rentList);
      expect(prismaService.rent.findMany).toHaveBeenCalled();
    });

    describe("findOneOrThrow", () => {
      it("should return a rent entity if found", async () => {
        prismaService.rent.findUniqueOrThrow = jest.fn().mockResolvedValue(fakeRentEntity);

        const result = await repository.findOneOrThrow(fakeUUID);
        expect(result).toEqual(fakeRentEntity);
        expect(prismaService.rent.findUniqueOrThrow).toHaveBeenCalledWith({
          where: { id: fakeUUID },
          include: { locker: true },
        });
      });

      it("should throw an error if rent is not found", async () => {
        prismaService.rent.findUniqueOrThrow = jest.fn().mockRejectedValue(new Error("Rent not found"));

        await expect(repository.findOneOrThrow(fakeUUID)).rejects.toThrow("Rent not found");
        expect(prismaService.rent.findUniqueOrThrow).toHaveBeenCalledWith({
          where: { id: fakeUUID },
          include: { locker: true },
        });
      });
    });
  });
});
