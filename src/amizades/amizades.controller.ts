import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AmizadesService } from './amizades.service';
import { CreateAmizadeDto } from './dto/create-amizade.dto';

@Controller('amizades')
export class AmizadesController {
  constructor(private readonly amizadesService: AmizadesService) {}

  @Post()
  create(@Body() createAmizadeDto: CreateAmizadeDto) {
    return this.amizadesService.create(createAmizadeDto);
  }

  @Get()
  findAll() {
    return this.amizadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.amizadesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.amizadesService.remove(+id);
  }
}
