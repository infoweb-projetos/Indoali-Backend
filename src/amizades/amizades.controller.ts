import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AmizadesService } from './amizades.service';
import { CreateAmizadeDto } from './dto/create-amizade.dto';
import { UpdateAmizadeDto } from './dto/update-amizade.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('amizades')
export class AmizadesController {
  constructor(private readonly amizadesService: AmizadesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAmizadeDto: CreateAmizadeDto) {
    return this.amizadesService.create(createAmizadeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.amizadesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.amizadesService.findOne(id);
  }

  @Get('usuario/:id')
  @UseGuards(JwtAuthGuard)
  findByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.amizadesService.findByUserId(id);
  }

  @Get(':id_user/:id_friend')
  @UseGuards(JwtAuthGuard)
  check(@Param('id_user', ParseIntPipe) id_user: number, @Param('id_friend', ParseIntPipe) id_friend: number){
    return this.amizadesService.findByUsers(id_user, id_friend);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAmizadeDto: UpdateAmizadeDto) {
    return this.amizadesService.update(id, updateAmizadeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.amizadesService.remove(id);
  }
}
