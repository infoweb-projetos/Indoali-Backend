import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';

@Injectable()
export class RolesService {
  constructor(private persistencia: PersistenciaService) {}
  
  async create(createRoleDto: CreateRoleDto) {
    const existUsuario = await this.persistencia.usuario.findFirst({
      where: {
        id: createRoleDto.criador_id,
      },
    });
    if (existUsuario){
      return this.persistencia.role.create({
        data: createRoleDto,
      });
    }
    else{
      throw new BadRequestException('Erro ao criar rolê');
    }
  }

  async findAll() {
    const roles = await this.persistencia.role.findMany();
    return {
      roles
    };
  }

  async findByUserId(id: number){
    const roles = await this.persistencia.role.findMany();
    const rolesdousuario = roles.filter(r => r.criador_id === id || r.usuarios_id.split(',').map(Number).includes(id));
    return {
      rolesdousuario
    };
  }

  async findOne(id: number) {
    const lugare = await this.persistencia.lugare.findUnique({
      where: { id },
    });
    if (lugare) {
      return {
        estado: 'ok',
        dados: lugare,
      };
    } else {
      return {
        estado: 'nok',
        mensagem: `Lugar com id #${id} não existe!`,
      };
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.persistencia.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: number) {
    const role = await this.persistencia.role.delete({
      where: { id },
    });
    return {
      estado: 'ok',
      dados: role,
    };
  }
}
