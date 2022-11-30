import { Test, TestingModule } from '@nestjs/testing';
import { RetrospectService } from './retrospect.service';

describe('RetrospectService', () => {
  let service: RetrospectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetrospectService],
    }).compile();

    service = module.get<RetrospectService>(RetrospectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
