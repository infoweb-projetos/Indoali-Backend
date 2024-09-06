import { Module } from '@nestjs/common';
import { LugaresService } from './lugares.service';
import { LugaresController } from './lugares.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';

@Module({
  controllers: [LugaresController],
  providers: [LugaresService],
  imports: [PersistenciaModule],
})
export class LugaresModule {}
