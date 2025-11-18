import { Test, TestingModule } from '@nestjs/testing';
import { SpmController } from './spm.controller';

describe('SpmController', () => {
  let controller: SpmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpmController],
    }).compile();

    controller = module.get<SpmController>(SpmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
