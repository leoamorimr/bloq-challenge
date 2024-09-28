import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { BloqEntity } from 'src/model/entity/bloq.entity';
import { PrismaBloqRepository } from './bloq.repository';

describe('PrismaBloqRepository', () => {
  let repository: PrismaBloqRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaBloqRepository,
        {
          provide: PrismaService,
          useValue: {
            bloq: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PrismaBloqRepository>(PrismaBloqRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new bloq', async () => {
      const bloq: BloqEntity = {
        id: randomUUID(),
        title: 'Test Title',
        address: 'Test Address',
      };

      const createdBloq = {
        ...bloq,
        id: expect.any(String),
      };

      jest.spyOn(prismaService.bloq, 'create').mockResolvedValue(createdBloq);

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
});
