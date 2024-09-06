import { Injectable } from '@nestjs/common';
import { CreateLugareDto } from './dto/create-lugare.dto';
import { UpdateLugareDto } from './dto/update-lugare.dto';
import { LugareEntity } from './entities/lugare.entity';
import { PersistenciaService } from 'src/persistencia/persistencia.service';


@Injectable()
export class LugaresService {
  constructor(private persistencia: PersistenciaService) {}

  lugares: LugareEntity[] = [];
  contador: number = 0;
  async create(createLugareDto: CreateLugareDto) {
    const l = await this.persistencia.lugare.create({data: createLugareDto})
    // const lugare = {
    //   id: this.contador + 1,
    //   ...createLugareDto,
    // };
    // this.contador += 1;
    // this.lugares.push(lugare);
    return {
      estado: 'ok',
      dados: l,
    };
  }

  findAll() {
    return {
      estado: 'ok',
      dados: this.lugares,
    };
  }

  findOne(id: number) {
    const temp = this.lugares.filter((lugare) => lugare.id === id);
    if (temp[0]) {
      return {
        estado: 'ok',
        dados: temp[0],
      };
    } else {
      return {
        estado: 'nok',
        mensagem: `lugare com #${id} não existe!`,
      };
    }
  }

  update(id: number, updateLugareDto: UpdateLugareDto) {
    const index = this.lugares.findIndex((lugare) => lugare.id === id);
    if (index >= 0) {
      this.lugares[index] = {
        ...this.lugares[index],
        ...updateLugareDto,
      };
      return {
        estado: 'ok',
        dados: this.lugares[index],
      }
    }
    return {
      estado: 'nok',
      mensagem: `lugare com #${id} não existe!`,
    };
  }

  remove(id: number) {
    const index = this.lugares.findIndex((lugare) => lugare.id === id);
    if (index >= 0) {
      const lugaresRemovidas = this.lugares.splice(index, 1);
      return {
        estado: 'ok',
        dados: lugaresRemovidas[0],
      };
    } else {
      return {
        estado: 'nok',
        mensagem: `lugare com #${id} não existe!`,
      };
    }
  }
}
