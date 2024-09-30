import { HttpException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "node:crypto";
import { LockerCreateDto } from "src/model/dto/locker-create.dto";
import { LockerResponseDto } from "src/model/dto/locker-response.dto";
import { LockerUpdateDto } from "src/model/dto/locker-update.dto";
import { LockerService } from "src/service/locker.service";
import {
  fakeLockRequestDto,
  fakeLockResponseDto,
} from "../../test/mock/fake-locker";
import { LockerController } from "./locker.controller";

describe("LockerController", () => {
  let lockerController: LockerController;
  let lockerService: LockerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LockerController],
      providers: [
        {
          provide: LockerService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    lockerController = module.get<LockerController>(LockerController);
    lockerService = module.get<LockerService>(LockerService);
  });

  describe("create", () => {
    const lockerCreateDto: LockerCreateDto =
      fakeLockRequestDto as LockerCreateDto;
    const lockerResponseDto: LockerResponseDto = fakeLockResponseDto;

    it("should create a new locker", async () => {
      jest.spyOn(lockerService, "create").mockResolvedValue(lockerResponseDto);

      const result = await lockerController.create(lockerCreateDto);
      expect(result).toEqual(lockerResponseDto);
      expect(lockerService.create).toHaveBeenCalledWith(lockerCreateDto);
    });

    it("should throw an HttpException if creation fails", async () => {
      const httpException = new HttpException("Error", 400);

      jest.spyOn(lockerService, "create").mockRejectedValue(httpException);

      await expect(lockerController.create(lockerCreateDto)).rejects.toThrow(
        httpException,
      );
    });
  });

  describe("update", () => {
    const lockerId = randomUUID();
    const lockerUpdateDto: LockerUpdateDto =
      fakeLockRequestDto as LockerUpdateDto;
    const lockerResponseDto: LockerResponseDto = fakeLockResponseDto;

    it("should update an existing locker", async () => {
      jest.spyOn(lockerService, "update").mockResolvedValue(lockerResponseDto);

      const result = await lockerController.update(lockerId, lockerUpdateDto);
      expect(result).toEqual(lockerResponseDto);
      expect(lockerService.update).toHaveBeenCalledWith(
        lockerId,
        lockerUpdateDto,
      );
    });

    it("should throw an HttpException if update fails", async () => {
      const httpException = new HttpException("Error", 400);

      jest.spyOn(lockerService, "update").mockRejectedValue(httpException);

      await expect(
        lockerController.update(lockerId, lockerUpdateDto),
      ).rejects.toThrow(httpException);
    });
  });

  describe("findAll", () => {
    it("should return an array of lockers", async () => {
      const lockerList: LockerResponseDto[] = [fakeLockResponseDto];
      jest.spyOn(lockerService, "findAll").mockResolvedValue(lockerList);

      await lockerController.findAll();
      expect(lockerService.findAll).toHaveBeenCalled();
    });
  });
});
