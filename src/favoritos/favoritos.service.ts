import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';

@Injectable()
export class FavoritosService {
  constructor(private persistencia: PersistenciaService) {}

  async create(createFavoritoDto: CreateFavoritoDto) {
    const existFavorito = await this.persistencia.favorito.findFirst({
      where: {
        id_usuario: createFavoritoDto.id_usuario,
        id_lugar: createFavoritoDto.id_lugar,
      },
    });
    //console.log(existFavorito)

    if (existFavorito){
      throw new BadRequestException('Você já favoritou esse lugar');
    }
    return this.persistencia.favorito.create({
        data: createFavoritoDto,
      });
  }

  async findAll() {
    const favoritos = await this.persistencia.favorito.findMany();
    return {
      favoritos
    };
  }

  async findByUserId(id: number) {
    const favoritos = await this.findAll();
    const favoritosdousuario = favoritos.favoritos.filter(usuario => usuario.id_usuario === id);
    return{
      favoritosdousuario
    };
  }

  async findOne(id: number) {
    const favorito = await this.persistencia.favorito.findUnique({
      where: { id },
    });
    if (favorito) {
      return {
        estado: 'ok',
        dados: favorito,
      };
    } else {
      return {
        estado: 'nok',
        mensagem: `Favorito com id #${id} não existe!`,
      };
    }
  }

  async remove(id: number) {
    const favorito = await this.persistencia.favorito.delete({
      where: { id },
    });
    return {
      estado: 'ok',
      dados: favorito,
    };
  }
}
