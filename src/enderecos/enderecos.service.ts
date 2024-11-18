import { Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';
@Injectable()
export class EnderecosService {
  
  async create(createEnderecoDto: CreateEnderecoDto) {
    const existEndereco = await this.persistencia.endereco.findFirst({
      where: {
        id_usuario: createEnderecoDto.id_usuario,
        id_lugar: createEnderecoDto.id_lugar,
      },
    });
    //console.log(existEndereco)

    if (existEndereco){
      throw new BadRequestException('Você já enderecou esse lugar');
    }
    return this.persistencia.endereco.create({
        data: createEnderecoDto,
      });
  }

  async findAll() {
    const enderecos = await this.persistencia.endereco.findMany();
    return {
      enderecos
    };
  }

  async findByUserId(id: number) {
    const enderecos = await this.findAll();
    const enderecosdousuario = enderecos.enderecos.filter(usuario => usuario.id_usuario === id);
    return{
      enderecosdousuario
    };
  }

  async findOne(id: number) {
    const endereco = await this.persistencia.endereco.findUnique({
      where: { id },
    });
    if (endereco) {
      return {
        estado: 'ok',
        dados: endereco,
      };
    } else {
      return {
        estado: 'nok',
        mensagem: `Endereço com id #${id} não existe!`,
      };
    }
  }

  async remove(id: number) {
    const endereco = await this.persistencia.endereco.delete({
      where: { id },
    });
    return {
      estado: 'ok',
      dados: endereco,
    };
  }
}
