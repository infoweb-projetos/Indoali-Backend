import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersistenciaModule } from './persistencia/persistencia.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { LugaresModule } from './lugares/lugares.module';
import { FavoritosModule } from './favoritos/favoritos.module';
import { AmizadesModule } from './amizades/amizades.module';
import { EnderecosModule } from './enderecos/enderecos.module';

@Module({
  imports: [PersistenciaModule, UsuariosModule, AuthModule, LugaresModule, FavoritosModule, AmizadesModule, EnderecosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
