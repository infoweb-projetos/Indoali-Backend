import { Test, TestingModule } from '@nestjs/testing';
import { AmizadesController } from './amizades.controller';
import { AmizadesService } from './amizades.service';

describe('AmizadesController', () => {
  let controller: AmizadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmizadesController],
      providers: [AmizadesService],
    }).compile();

    controller = module.get<AmizadesController>(AmizadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
