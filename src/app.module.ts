import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersistenciaModule } from './persistencia/persistencia.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { LugaresModule } from './lugares/lugares.module';

@Module({
  imports: [PersistenciaModule, UsuariosModule, AuthModule, LugaresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
