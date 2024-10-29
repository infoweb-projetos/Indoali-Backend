import { Module } from '@nestjs/common';
import { AmizadesService } from './amizades.service';
import { AmizadesController } from './amizades.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';

@Module({
  controllers: [AmizadesController],
  providers: [AmizadesService],
  imports: [PersistenciaModule],
})
export class AmizadesModule {}
