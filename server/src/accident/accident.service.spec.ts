import { Test, TestingModule } from '@nestjs/testing';
import { AccidentService } from './accident.service';

describe('AccidentService', () => {
  let service: AccidentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccidentService],
    }).compile();

    service = module.get<AccidentService>(AccidentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
