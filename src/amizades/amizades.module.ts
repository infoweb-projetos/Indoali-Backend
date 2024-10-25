import { Module } from '@nestjs/common';
import { AmizadesService } from './amizades.service';
import { AmizadesController } from './amizades.controller';

@Module({
  controllers: [AmizadesController],
  providers: [AmizadesService],
})
export class AmizadesModule {}
