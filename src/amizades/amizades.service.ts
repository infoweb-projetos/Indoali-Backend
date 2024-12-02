import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAmizadeDto } from './dto/create-amizade.dto';
import { UpdateAmizadeDto } from './dto/update-amizade.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';

@Injectable()
export class AmizadesService {
  constructor(private persistencia: PersistenciaService) {}

  async create(createAmizadeDto: CreateAmizadeDto) {

    const existUsuario1 = await this.persistencia.usuario.findFirst({
      where: {
        id: createAmizadeDto.id_emissor,
      },
    });

    const existUsuario2 = await this.persistencia.usuario.findFirst({
      where: {
        id: createAmizadeDto.id_receptor,
      },
    });

    console.log(existUsuario1)
    console.log(existUsuario2)

    const existAmizade = await this.persistencia.amizade.findFirst({
      where: {
        OR: [
          {
            id_emissor: createAmizadeDto.id_emissor,
            id_receptor: createAmizadeDto.id_receptor,
          },
          {
            id_emissor: createAmizadeDto.id_receptor,
            id_receptor: createAmizadeDto.id_emissor,
          },
        ],
      },
    });
    //console.log(existAmizade)
    if (existAmizade){
      throw new BadRequestException('Vocês já são amigos');
    }

    if (createAmizadeDto.id_emissor == createAmizadeDto.id_receptor){
      throw new BadRequestException('Você já é o seu melhor amigo');
    }

    if (existUsuario1 || existUsuario2){
      return this.persistencia.amizade.create({
        data: createAmizadeDto,
      });
    } else {
      throw new BadRequestException('Esse usuário não existe');
    }
  }

  async findAll() {
    const amizades = await this.persistencia.amizade.findMany();
    return {
      amizades
    };
  }

  async findByUserId(id: number){
    const amizades = await this.findAll();
    const amigosdousuario = amizades.amizades.filter(usuario => usuario.id_emissor === id || usuario.id_receptor === id);
    return{
      amigosdousuario
    };
  }

  async findOne(id: number) {
    const amizade = await this.persistencia.amizade.findUnique({
      where: { id },
    });
    if (amizade) {
      return {
        estado: 'ok',
        dados: amizade,
      };
    } else {
      return {
        estado: 'nok',
        mensagem: `Esse teusamigo não existe!`,
      };
    }
  }

  async findByUsers(id_user: number, id_friend: number){
    const todos = await this.findByUserId(id_user);
    const amizade = todos.amigosdousuario.find((amigo: any) => 
      amigo.id_emissor ===  id_friend || amigo.id_receptor === id_friend
    );
    if (amizade){
      return amizade
    } else {
      return null
    }
  }

  async update(id: number, updateAmizadeDto: UpdateAmizadeDto) {
    return this.persistencia.amizade.update({
      where: { id },
      data: updateAmizadeDto,
    });
  }

  async remove(id: number) {
    const amizade = await this.persistencia.amizade.delete({
      where: { id },
    });
    return {
      estado: 'ok',
      dados: amizade,
    };
  }
}
