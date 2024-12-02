import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';

@Injectable()
export class RolesService {
  constructor(private persistencia: PersistenciaService) {}
  
  async create(createRoleDto: CreateRoleDto) {
    return this.persistencia.role.create({
      data: createRoleDto,
    });
  }

  async findAll() {
    const roles = await this.persistencia.role.findMany();
    return {
      roles
    };
  }

  async findByUserId(id: number){
    const roles = await this.persistencia.role.findMany();
    return {
      roles
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
