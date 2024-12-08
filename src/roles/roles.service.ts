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
        id: createRoleDto.id_criador,
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

  async findByCriadorId(id: number){
    const roles = await this.persistencia.role.findMany();
    const rolesdousuario = roles.filter(r => r.id_criador === id);
    return {
      rolesdousuario
    };
  }

  async findByUserId(id: number){
    const roles = await this.persistencia.role.findMany();
    const rolesrel = await this.persistencia.usuarioRole.findMany();
    const rolesreluser = rolesrel.filter(r => r.id_usuario === id);
    const rolesuser = roles.filter(role =>
      rolesreluser.some(rel => rel.id_role === role.id)
    );
    return { rolesuser };
  }

  async findOne(id: number) {
    const role = await this.persistencia.role.findUnique({
      where: { id },
    });
    if (role) {
      return {
        estado: 'ok',
        dados: role,
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
