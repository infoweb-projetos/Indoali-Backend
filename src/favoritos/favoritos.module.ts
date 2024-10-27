import { Module } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';

@Module({
  controllers: [FavoritosController],
  providers: [FavoritosService],
  imports: [PersistenciaModule],
  exports: [FavoritosService],
})
export class FavoritosModule {}
