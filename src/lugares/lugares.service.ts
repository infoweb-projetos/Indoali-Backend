import { Injectable } from '@nestjs/common';
import { CreateLugareDto } from './dto/create-lugare.dto';
import { UpdateLugareDto } from './dto/update-lugare.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';




@Injectable()
export class LugaresService {
  constructor(private persistencia: PersistenciaService) {}

  async create(createLugareDto: CreateLugareDto) {
      return this.persistencia.lugare.create({
        data: createLugareDto,
      });
  }

  async findAll() {
    const lugares = await this.persistencia.lugare.findMany();
    return {
      lugares
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

  async update(id: number, updateLugareDto: UpdateLugareDto) {
    return this.persistencia.lugare.update({
      where: { id },
      data: updateLugareDto,
    });
  }

  async remove(id: number) {
    const lugare = await this.persistencia.lugare.delete({
      where: { id },
    });
    return {
      estado: 'ok',
      dados: lugare,
    };
  }
}
