import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createFavoritoDto: CreateFavoritoDto) {
    return this.favoritosService.create(createFavoritoDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.favoritosService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.favoritosService.findOne(id);
  }

  @Get('usuario/:id')
  @UseGuards(JwtAuthGuard)
  findByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.favoritosService.findByUserId(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.favoritosService.remove(id);
  }
}
