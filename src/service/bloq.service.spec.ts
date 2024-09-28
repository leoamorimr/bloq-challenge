import { Test, TestingModule } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { BloqRequestDto } from 'src/model/dto/bloq-create.dto';
import { BloqResponseDto } from 'src/model/dto/bloq-response.dto';
import { BloqEntity } from 'src/model/entity/bloq.entity';
import { BloqRepository } from 'src/repository/bloq.repository';
import { BloqService } from './bloq.service';

describe('BloqService', () => {
  let service: BloqService;
  let repository: BloqRepository;
  let logger: PinoLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BloqService,
        {
          provide: BloqRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: PinoLogger,
          useValue: {
            info: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BloqService>(BloqService);
    repository = module.get<BloqRepository>(BloqRepository);
    logger = module.get<PinoLogger>(PinoLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBloq', () => {
    it('should create a new bloq and return BloqResponseDto', async () => {
      const bloqRequestDto: BloqRequestDto = {
        title: 'Test Title',
        address: 'Test Address',
      };

      const createdBloq: BloqEntity = {
        id: 'some-uuid',
        title: 'Test Title',
        address: 'Test Address',
      };

      jest.spyOn(repository, 'create').mockResolvedValue(createdBloq);

      const result = await service.createBloq(bloqRequestDto);

      expect(logger.info).toHaveBeenCalledWith('Creating new bloq');
      expect(repository.create).toHaveBeenCalledWith(
        new BloqEntity(bloqRequestDto.title, bloqRequestDto.address),
      );
      expect(result).toEqual(new BloqResponseDto(createdBloq));
    });
  });
});
