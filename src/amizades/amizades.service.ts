import { Injectable } from '@nestjs/common';
import { CreateAmizadeDto } from './dto/create-amizade.dto';

@Injectable()
export class AmizadesService {
  create(createAmizadeDto: CreateAmizadeDto) {
    return 'This action adds a new amizade';
  }

  findAll() {
    return `This action returns all amizades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} amizade`;
  }

  remove(id: number) {
    return `This action removes a #${id} amizade`;
  }
}
