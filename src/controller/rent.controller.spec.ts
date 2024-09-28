import { HttpException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "crypto";
import { RentCreateDto } from "src/model/dto/rent-create.dto";
import { RentResponseDto } from "src/model/dto/rent-response.dto";
import { RentUpdateDto } from "src/model/dto/rent-update.dto";
import { RentService } from "src/service/rent.service";
import { fakeRentRequestDto, fakeRentResponseDto } from "../../test/mock/rent";
import { RentController } from "./rent.controller";

describe("RentController", () => {
  let rentController: RentController;
  let rentService: RentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentController],
      providers: [
        {
          provide: RentService,
          useValue: {
            create: jest.fn(),
            deposit: jest.fn(),
            retrieve: jest.fn(),
          },
        },
      ],
    }).compile();

    rentController = module.get<RentController>(RentController);
    rentService = module.get<RentService>(RentService);
  });

  const rentCreateDto: RentCreateDto = fakeRentRequestDto as RentCreateDto;
  const rentUpdateDto: RentUpdateDto = fakeRentRequestDto as RentUpdateDto;
  const rentResponseDto: RentResponseDto = fakeRentResponseDto;
  const rentId = randomUUID();

  describe("createRent", () => {
    it("should create a new rent", async () => {
      jest.spyOn(rentService, "create").mockResolvedValue(rentResponseDto);

      const result = await rentController.createRent(rentCreateDto);
      expect(result).toEqual(rentResponseDto);
      expect(rentService.create).toHaveBeenCalledWith(rentCreateDto);
    });

    it("should throw an HttpException if creation fails", async () => {
      const httpException = new HttpException("Error", 400);

      jest.spyOn(rentService, "create").mockRejectedValue(httpException);

      await expect(rentController.createRent(rentCreateDto)).rejects.toThrow(
        httpException,
      );
    });
  });

  describe("deposit", () => {
    it("should deposit to an existing rent", async () => {
      jest.spyOn(rentService, "deposit").mockResolvedValue(rentResponseDto);

      const result = await rentController.deposit(rentId, rentUpdateDto);
      expect(result).toEqual(rentResponseDto);
      expect(rentService.deposit).toHaveBeenCalledWith(rentId, rentUpdateDto);
    });

    it("should throw an HttpException if deposit fails", async () => {
      const httpException = new HttpException("Error", 400);

      jest.spyOn(rentService, "deposit").mockRejectedValue(httpException);

      await expect(
        rentController.deposit(rentId, rentUpdateDto),
      ).rejects.toThrow(httpException);
    });
  });

  describe("retrieve", () => {
    it("should retrieve an existing rent", async () => {
      const response: object = { message: "Any message" };
      jest.spyOn(rentService, "retrieve").mockResolvedValue(response);

      const result = await rentController.retrieve(rentId);
      expect(result).toEqual(response);
      expect(rentService.retrieve).toHaveBeenCalledWith(rentId);
    });

    it("should throw an HttpException if retrieval fails", async () => {
      const httpException = new HttpException("Error", 400);

      jest.spyOn(rentService, "retrieve").mockRejectedValue(httpException);

      await expect(rentController.retrieve(rentId)).rejects.toThrow(
        httpException,
      );
    });
  });
});
