import { Test, TestingModule } from "@nestjs/testing";
import { isNil, omitBy } from "lodash";
import { randomUUID } from "node:crypto";
import { fakeUUID } from "../../../test/mock/fake-locker";
import { PrismaService } from "../../database/prisma.service";
import { BloqEntity } from "../../model/entity/bloq.entity";
import { PrismaBloqRepository } from "./prisma-bloq.repository";

jest.mock("../../database/prisma.service");

describe("PrismaBloqRepository", () => {
  let repository: PrismaBloqRepository;
  let prismaService: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaBloqRepository, PrismaService],
    }).compile();

    repository = module.get<PrismaBloqRepository>(PrismaBloqRepository);
    prismaService = module.get<PrismaService>(
      PrismaService,
    ) as jest.Mocked<PrismaService>;

    Object.defineProperty(prismaService, "bloq", {
      value: {
        findUnique: jest.fn(),
        findUniqueOrThrow: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
        findMany: jest.fn(),
        findAll: jest.fn(),
      },
      writable: true,
    });
  });

  describe("findOne", () => {
    it("should find a bloq by ID", async () => {
      const bloqId = "some-uuid";
      const bloq: BloqEntity = {
        id: bloqId,
        title: "Test Title",
        address: "Test Address",
      };

      prismaService.bloq.findUnique = jest.fn().mockResolvedValue(bloq);

      const result = await repository.findOne(bloqId);
      expect(result).toEqual(bloq);
      expect(prismaService.bloq.findUnique).toHaveBeenCalledWith({
        where: { id: bloqId },
      });
    });
  });

  describe("findUniqueOrThrow", () => {
    it("should find a bloq by ID or throw an error", async () => {
      const bloqId = "some-uuid";
      const bloq: BloqEntity = {
        id: bloqId,
        title: "Test Title",
        address: "Test Address",
      };

      prismaService.bloq.findUniqueOrThrow = jest.fn().mockResolvedValue(bloq);

      const result = await repository.findUniqueOrThrow(bloqId);
      expect(result).toEqual(bloq);
      expect(prismaService.bloq.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: bloqId },
      });
    });
  });

  describe("update", () => {
    it("should update a bloq", async () => {
      const bloq: BloqEntity = {
        id: "some-uuid",
        title: "Updated Title",
        address: "Updated Address",
      };
      const updatedBloq: BloqEntity = { ...bloq };

      prismaService.bloq.update = jest.fn().mockResolvedValue(updatedBloq);

      const result = await repository.update(fakeUUID, bloq);
      expect(result).toEqual(updatedBloq);
      expect(prismaService.bloq.update).toHaveBeenCalledWith({
        data: omitBy({ title: bloq.title, address: bloq.address }, isNil),
        where: { id: bloq.id },
      });
    });
  });

  describe("create", () => {
    it("should create a new bloq", async () => {
      const bloq: BloqEntity = {
        id: "some-uuid",
        title: "New Title",
        address: "New Address",
      };
      const createdBloq: BloqEntity = { ...bloq, id: randomUUID() };

      prismaService.bloq.create = jest.fn().mockResolvedValue(createdBloq);

      const result = await repository.create(bloq);
      expect(result).toEqual(createdBloq);
      expect(prismaService.bloq.create).toHaveBeenCalledWith({
        data: {
          id: expect.any(String),
          title: bloq.title,
          address: bloq.address,
        },
      });
    });
  });

  describe("findAll", () => {
    it("should return an array of bloqs", async () => {
      const bloqList: BloqEntity[] = [
        {
          id: "some-uuid-1",
          title: "Test Title 1",
          address: "Test Address 1",
        },
        {
          id: "some-uuid-2",
          title: "Test Title 2",
          address: "Test Address 2",
        },
      ];
      prismaService.bloq.findMany = jest.fn().mockResolvedValue(bloqList);

      await repository.findAll();
      expect(prismaService.bloq.findMany).toHaveBeenCalled();
    });
  });
});
