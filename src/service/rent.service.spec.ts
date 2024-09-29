import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PinoLogger } from "nestjs-pino";
import { RentCreateDto } from "src/model/dto/rent-create.dto";
import { RentRepository } from "src/repository/rent.repository";
import { fakeLockEntity, fakeUUID } from "../../test/mock/fake-locker";
import {
  fakeRentEntity,
  fakeRentRequestDto,
  fakeRentResponseDto,
} from "../../test/mock/rent";
import { RentResponseDto } from "../model/dto/rent-response.dto";
import { RentUpdateDto } from "../model/dto/rent-update.dto";
import { LockerService } from "./locker.service";
import { RentService } from "./rent.service";

describe("RentService", () => {
  let service: RentService;
  let rentRepository: RentRepository;
  let lockerService: LockerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentService,
        {
          provide: RentRepository,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOneOrThrow: jest.fn(),
          },
        },
        {
          provide: LockerService,
          useValue: {
            isLockerAvailable: jest.fn(),
            changeOccupied: jest.fn(),
            findOneOrThrow: jest.fn(),
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

    service = module.get<RentService>(RentService);
    rentRepository = module.get<RentRepository>(RentRepository);
    lockerService = module.get<LockerService>(LockerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a rent without locker", async () => {
      const fakeInput = { ...fakeRentRequestDto };
      fakeInput.lockerId = null;

      jest.spyOn(rentRepository, "create").mockResolvedValue(fakeRentEntity);
      jest.spyOn(lockerService, "isLockerAvailable").mockResolvedValue(true);

      const result = await service.create(fakeInput as RentCreateDto);

      expect(result).toEqual(fakeRentResponseDto);
      expect(rentRepository.create).toHaveBeenCalledWith(fakeInput);
    });

    it("should create a rent without locker", async () => {
      jest.spyOn(rentRepository, "create").mockResolvedValue(fakeRentEntity);
      jest.spyOn(lockerService, "isLockerAvailable").mockResolvedValue(true);

      const result = await service.create(fakeRentRequestDto as RentCreateDto);

      expect(result).toEqual(expect.any(Object));
      expect(rentRepository.create).toHaveBeenCalledWith(fakeRentRequestDto);
    });

    it("should create a rent with available locker", async () => {
      jest.spyOn(rentRepository, "create").mockResolvedValue(fakeRentEntity);
      jest.spyOn(lockerService, "isLockerAvailable").mockResolvedValue(true);

      const result = await service.create(fakeRentRequestDto as RentCreateDto);

      expect(result).toEqual(expect.any(RentResponseDto));
      expect(lockerService.isLockerAvailable).toHaveBeenCalledWith(
        fakeRentRequestDto.lockerId,
      );
      expect(rentRepository.create).toHaveBeenCalled();
    });

    it("should throw BadRequestException on create a rent", async () => {
      jest.spyOn(lockerService, "isLockerAvailable").mockResolvedValue(true);
      jest
        .spyOn(rentRepository, "create")
        .mockRejectedValue(new InternalServerErrorException());

      await expect(
        service.create(fakeRentRequestDto as RentCreateDto),
      ).rejects.toThrow(InternalServerErrorException);

      expect(rentRepository.create).toHaveBeenCalled();
    });

    it("should throw BadRequestException if locker is not available", async () => {
      jest.spyOn(lockerService, "isLockerAvailable").mockResolvedValue(false);

      await expect(
        service.create(fakeRentRequestDto as RentCreateDto),
      ).rejects.toThrow(BadRequestException);
      expect(lockerService.isLockerAvailable).toHaveBeenCalledWith(
        fakeRentRequestDto.lockerId,
      );
    });
  });

  describe("retrieve", () => {
    it("should retrieve a rent by its id and update locker status", async () => {
      jest
        .spyOn(rentRepository, "findOneOrThrow")
        .mockResolvedValue(fakeRentEntity);
      jest
        .spyOn(lockerService, "changeOccupied")
        .mockResolvedValue(fakeLockEntity);

      const result = await service.retrieve(fakeUUID);

      expect(result).toEqual({ message: "Rent retrieved successfully" });
      expect(rentRepository.findOneOrThrow).toHaveBeenCalledWith(fakeUUID);
      expect(rentRepository.delete).toHaveBeenCalledWith(fakeUUID);
      expect(lockerService.changeOccupied).toHaveBeenCalledWith(
        "any-uuid",
        false,
      );
    });

    it("should throw NotFoundException if rent is not found", async () => {
      jest
        .spyOn(rentRepository, "findOneOrThrow")
        .mockRejectedValue(new NotFoundException());

      await expect(service.retrieve(fakeUUID)).rejects.toThrow(
        NotFoundException,
      );
      expect(rentRepository.findOneOrThrow).toHaveBeenCalledWith(fakeUUID);
    });
  });

  describe("deposit", () => {
    it("should deposit rent in a valid locker", async () => {
      jest
        .spyOn(rentRepository, "findOneOrThrow")
        .mockResolvedValue(fakeRentEntity);
      jest
        .spyOn(lockerService, "findOneOrThrow")
        .mockResolvedValue(fakeLockEntity);
      jest.spyOn(lockerService, "isLockerAvailable").mockResolvedValue(true);
      jest.spyOn(rentRepository, "update").mockResolvedValue(fakeRentEntity);

      jest
        .spyOn(lockerService, "changeOccupied")
        .mockResolvedValue(fakeLockEntity);

      jest
        .spyOn(rentRepository, "findOneOrThrow")
        .mockResolvedValue(fakeRentEntity);

      const result = await service.deposit(
        fakeUUID,
        fakeRentRequestDto as RentUpdateDto,
      );

      expect(rentRepository.update).toHaveBeenCalled();
      expect(lockerService.changeOccupied).toHaveBeenCalled();
      expect(rentRepository.findOneOrThrow).toHaveBeenCalled();
      expect(result).toEqual(fakeRentResponseDto);
    });

    it("should throw NotFoundException if rent is not found", async () => {
      jest
        .spyOn(rentRepository, "findOneOrThrow")
        .mockRejectedValue(new NotFoundException());

      await expect(
        service.deposit(fakeUUID, fakeRentRequestDto),
      ).rejects.toThrow(NotFoundException);
      expect(rentRepository.findOneOrThrow).toHaveBeenCalledWith(fakeUUID);
    });

    it("should throw NotFoundException if locker is not found", async () => {
      jest
        .spyOn(rentRepository, "findOneOrThrow")
        .mockResolvedValue(fakeRentEntity);

      jest
        .spyOn(lockerService, "findOneOrThrow")
        .mockRejectedValue(new NotFoundException());

      await expect(
        service.deposit(fakeUUID, fakeRentRequestDto),
      ).rejects.toThrow(NotFoundException);
      expect(rentRepository.findOneOrThrow).toHaveBeenCalledWith(fakeUUID);
    });

    it("should throw BadRequestException if new locker is not available", async () => {
      const fakeNewLock = { ...fakeLockEntity };
      fakeNewLock.id = "other-uuid";

      jest
        .spyOn(rentRepository, "findOneOrThrow")
        .mockResolvedValue(fakeRentEntity);

      jest
        .spyOn(lockerService, "findOneOrThrow")
        .mockResolvedValue(fakeNewLock);

      jest.spyOn(lockerService, "isLockerAvailable").mockResolvedValue(false);

      await expect(
        service.deposit(fakeUUID, fakeRentRequestDto),
      ).rejects.toThrow(BadRequestException);

      expect(rentRepository.findOneOrThrow).toHaveBeenCalledWith(fakeUUID);
    });

    it("should throw InternalServerErrorException on update Rent", async () => {
      jest
        .spyOn(rentRepository, "findOneOrThrow")
        .mockResolvedValue(fakeRentEntity);

      jest
        .spyOn(lockerService, "findOneOrThrow")
        .mockResolvedValue(fakeLockEntity);

      jest
        .spyOn((service as any).lockerService, "isLockerAvailable")
        .mockResolvedValue(true);

      jest.spyOn(rentRepository, "update").mockRejectedValue(new Error());

      await expect(
        service.deposit(fakeUUID, fakeRentRequestDto),
      ).rejects.toThrow(InternalServerErrorException);

      expect(rentRepository.findOneOrThrow).toHaveBeenCalledWith(fakeUUID);
    });
  });
});
