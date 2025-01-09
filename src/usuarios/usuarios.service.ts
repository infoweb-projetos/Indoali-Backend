import { Injectable,  BadRequestException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

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

  async findByUserName(userName: string){
    const usuario = await this.persistencia.usuario.findUnique({
      where: { userName },
    });
    if (usuario) {
      return {
        estado: 'ok',
        dados: usuario,
      };
    } else {
      return {
        estado: 'nok',
        mensagem: `O usuario @${userName} não existe!`,
      };
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {

    // if (updateUsuarioDto.senha) {
    //     updateUsuarioDto.senha = await bcrypt.hash(
    //     updateUsuarioDto.senha,
    //     roundsOfHashing,
    //   );
    // }

    //console.log(updateUsuarioDto)
    //console.log(id)

    const existingUserByEmail = await this.persistencia.usuario.findUnique({
      where: { email: updateUsuarioDto.email },
    });
  
    if (existingUserByEmail) {
      if (id != existingUserByEmail.id) {
        throw new BadRequestException('Email já está em uso');
      }
      //console.log(updateUsuarioDto.email)
      //console.log(existingUserByEmail.email)
    };
  
    const existingUserByUsername = await this.persistencia.usuario.findUnique({
      where: { userName: updateUsuarioDto.userName },
    });
  
    if (existingUserByUsername) {
      if (id != existingUserByUsername.id) {
        throw new BadRequestException('Nome de usuário já está em uso');
      }
      //console.log(updateUsuarioDto.userName)
      //console.log(existingUserByUsername.userName)
    };

    return this.persistencia.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: number) {
    
    await this.removeFoto(id)

    const usuario = await this.persistencia.usuario.delete({
      where: { id },
    });

    await this.persistencia.amizade.deleteMany({
      where: {
        OR: [
          { id_emissor: id },
          { id_receptor: id }
        ]
      }
    });
    await this.persistencia.favorito.deleteMany({
      where: { id_usuario: id },
    });

    return {
      estado: 'ok',
      dados: usuario,
    };
  }

  async uploadFoto(id: number, file: string){
    const usuario = await this.findOne(id)
    if (usuario.estado == 'ok') {
      await this.removeFoto(id)
      usuario.dados.fotoperfil = file
      //console.log(usuario.dados.fotoperfil)
      return this.persistencia.usuario.update({
        where: { id },
        data: usuario.dados,
      });
    }
  }

  async removeFoto(id:number) {
    const usuario = await this.findOne(id)
    if (usuario.estado == 'ok') {
      //console.log(`../../uploads/${usuario.dados.fotoperfil}`)

      if (usuario.dados.fotoperfil){
        fs.unlink(`uploads/${usuario.dados.fotoperfil}`, (err) => {
          if (err) {
            console.log('Erro ao deletar arquivo.');
          }
        });
        usuario.dados.fotoperfil = null
      }
      return this.persistencia.usuario.update({
        where: { id },
        data: usuario.dados,
      });
    }
  }
}