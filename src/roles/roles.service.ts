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

  async findByUserId(id: number) {
    const rolesCriados = await this.persistencia.role.findMany({
      where: {
        id_criador: id,
      },
    });

    const rolesRel = await this.persistencia.usuarioRole.findMany({
      where: {
        id_usuario: id,
        aceito: true,
      },
      select: { id_role: true },
    });
  
    const rolesParticipanteIds = rolesRel.map((rel) => rel.id_role);
  
    const rolesParticipantes = await this.persistencia.role.findMany({
      where: {
        id: { in: rolesParticipanteIds },
      },
    });
  
    const rolesUnicos = [
      ...rolesCriados,
      ...rolesParticipantes.filter(
        (role) => !rolesCriados.some((r) => r.id === role.id)
      ),
    ];
  
    const rolesComParticipantes = await Promise.all(
      rolesUnicos.map(async (role) => {
        const participantes = await this.findUsersRole(role.id);
        return {
          ...role,
          participantes,
        };
      })
    );

    if (rolesComParticipantes.length > 0) {
      return { roles: rolesComParticipantes };
    } else {
      throw new BadRequestException('Nenhum rolê encontrado para este usuário.');
    }
  }

  async findUsersRole(id: number){
    const existRole = await this.persistencia.role.findUnique({
      where: { id },
    });
    if (existRole) {
      const criadorId = existRole.id_criador;
      const rolesrel = await this.persistencia.usuarioRole.findMany({
        where: {id_role: id, aceito: true},
      });
      const usuariosIds = rolesrel.map((role) => role.id_usuario).join(' ');
      const todosUsuarios = `${criadorId} ${usuariosIds}`;
      return { todosUsuarios };
    } else {
      throw new BadRequestException('Este rolê não existe');
    }
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
