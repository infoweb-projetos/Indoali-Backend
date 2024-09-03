import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy';

export const jwtSecret = 'viadinhos@if';

@Module({
  imports: [
    PersistenciaModule,
    PassportModule,
    JwtModule.register({
      secret: 'viadinhos@if', //jwtSecret
      signOptions: { expiresIn: '7d' }, // 60, 60m, 24h, 7d
    }),
    UsuariosModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
