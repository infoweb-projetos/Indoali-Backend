import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAmizadeDto } from './dto/create-amizade.dto';
import { UpdateAmizadeDto } from './dto/update-amizade.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';

@Injectable()
export class AmizadesService {
  constructor(private persistencia: PersistenciaService) {}

  async create(createAmizadeDto: CreateAmizadeDto) {

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
      return this.persistencia.amizade.create({
        data: createAmizadeDto,
      });
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
