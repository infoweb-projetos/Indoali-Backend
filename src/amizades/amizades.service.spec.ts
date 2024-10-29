import { Test, TestingModule } from '@nestjs/testing';
import { AmizadesService } from './amizades.service';

describe('AmizadesService', () => {
  let service: AmizadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmizadesService],
    }).compile();

    service = module.get<AmizadesService>(AmizadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
