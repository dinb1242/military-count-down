import { Test, TestingModule } from '@nestjs/testing';
import { WikiController } from './wiki.controller';
import { WikiService } from './wiki.service';

describe('WikiController', () => {
  let controller: WikiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WikiController],
      providers: [WikiService],
    }).compile();

    controller = module.get<WikiController>(WikiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
