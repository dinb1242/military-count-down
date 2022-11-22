import { Test, TestingModule } from '@nestjs/testing';
import { ExampleService } from './example.service';
import { Example as ExampleModel, Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { convert, LocalDateTime } from 'js-joda';

describe('ExampleService', () => {
  let service: ExampleService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [PrismaModule],
      providers: [ExampleService, PrismaService],
    }).compile();

    service = module.get<ExampleService>(ExampleService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('예제가 생성된다.', async () => {
    /**
     * given
     */

    // Create DTO 를 생성한다.
    const createExampleDto: Prisma.ExampleCreateInput = {
      title: 'Test Title',
      content: 'Test Content',
    };

    // 리턴될 Example Model 을 생성한다.
    const savedExample: ExampleModel = {
      id: 1,
      title: createExampleDto.title,
      content: createExampleDto.content,
      createdAt: convert(LocalDateTime.now()).toDate(),
      updatedAt: convert(LocalDateTime.now()).toDate(),
    };

    // PrismaService Mocking
    const prismaExampleCreateSpyOn = jest.spyOn(prismaService.example, 'create').mockResolvedValue(savedExample);

    /**
     * when
     */

    const result = await service.createExample(createExampleDto);

    // then
    expect(prismaExampleCreateSpyOn).toHaveBeenCalledWith({
      data: createExampleDto,
    });

    expect(result).toEqual(savedExample);
  });
});
