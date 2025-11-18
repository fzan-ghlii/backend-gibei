import { Test, TestingModule } from '@nestjs/testing';
import { SpmService } from './spm.service';

describe('SpmService', () => {
  let service: SpmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpmService],
    }).compile();

    service = module.get<SpmService>(SpmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
