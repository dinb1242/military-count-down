import { Test, TestingModule } from '@nestjs/testing';
import { CoworkerService } from './coworker.service';

describe('CoworkerService', () => {
  let service: CoworkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoworkerService],
    }).compile();

    service = module.get<CoworkerService>(CoworkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
