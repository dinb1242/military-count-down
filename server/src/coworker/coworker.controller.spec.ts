import { Test, TestingModule } from '@nestjs/testing';
import { CoworkerController } from './coworker.controller';
import { CoworkerService } from './coworker.service';

describe('CoworkerController', () => {
  let controller: CoworkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoworkerController],
      providers: [CoworkerService],
    }).compile();

    controller = module.get<CoworkerController>(CoworkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
