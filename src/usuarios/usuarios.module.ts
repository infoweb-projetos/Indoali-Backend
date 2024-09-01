import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [PersistenciaModule],
  exports: [UsuariosService],
})
export class UsuariosModule {}
