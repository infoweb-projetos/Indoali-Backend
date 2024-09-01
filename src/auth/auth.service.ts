import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { PersistenciaService } from 'src/persistencia/persistencia.service';
  import { JwtService } from '@nestjs/jwt';
  import { AuthEntity } from './entity/auth.entity';
  import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class AuthService {
    constructor(private prisma: PersistenciaService, private jwtService: JwtService) {}
  
    async login(email: string, senha: string): Promise<AuthEntity> {
      const usuario = await this.prisma.usuario.findUnique({ where: { email: email } });
  
      if (!usuario) {
        throw new NotFoundException(`O usuário de email "${email}" não foi encontrado`);
      }

      const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
  
      if (!isPasswordValid) {
        throw new UnauthorizedException('A senha inserida é inválida');
      }

      return {
        accessToken: this.jwtService.sign({ usuarioId: usuario.id }),
        userId: usuario.id,
      };
    }
  }