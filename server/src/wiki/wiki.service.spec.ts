import { Test, TestingModule } from '@nestjs/testing';
import { WikiService } from './wiki.service';

describe('WikiService', () => {
  let service: WikiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WikiService],
    }).compile();

    service = module.get<WikiService>(WikiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
