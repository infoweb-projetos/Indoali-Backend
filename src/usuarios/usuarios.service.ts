import { Injectable,  BadRequestException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsuariosService {
  constructor(private persistencia: PersistenciaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {

    const existingUserByEmail = await this.persistencia.usuario.findUnique({
      where: { email: createUsuarioDto.email },
    });
  
    if (existingUserByEmail) {
      throw new BadRequestException('Email já está em uso');
    }
  
    const existingUserByUsername = await this.persistencia.usuario.findUnique({
      where: { userName: createUsuarioDto.userName },
    });
  
    if (existingUserByUsername) {
      throw new BadRequestException('Nome de usuário já está em uso');
    }

    const hashedPassword = await bcrypt.hash(
      createUsuarioDto.senha,
      roundsOfHashing,
    );

    createUsuarioDto.senha = hashedPassword;

    return this.persistencia.usuario.create({
      data: createUsuarioDto,
    });
  }

  async findAll() {
    const usuarios = await this.persistencia.usuario.findMany();
    return {
      usuarios
    };
  }

  async findOne(id: number) {
    const usuario = await this.persistencia.usuario.findUnique({
      where: { id },
    });
    if (usuario) {
      return {
        estado: 'ok',
        dados: usuario,
      };
    } else {
      return {
        estado: 'nok',
        mensagem: `Usuario com id #${id} não existe!`,
      };
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {

    if (updateUsuarioDto.senha) {
        updateUsuarioDto.senha = await bcrypt.hash(
        updateUsuarioDto.senha,
        roundsOfHashing,
      );
    }

    return this.persistencia.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: number) {
    const usuario = await this.persistencia.usuario.delete({
      where: { id },
    });
    return {
      estado: 'ok',
      dados: usuario,
    };
  }
}
