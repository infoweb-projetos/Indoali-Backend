import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe, UseInterceptors, UploadedFile, InternalServerErrorException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard, UserOwnershipGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)//, UserOwnershipGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.findOne(id);
  }

  @Get('username/:userName')
  @UseGuards(JwtAuthGuard)//, UserOwnershipGuard)
  findByUserName(@Param('userName') userName: string) {
    return this.usuariosService.findByUserName(userName);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, UserOwnershipGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserOwnershipGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.remove(id);
  }

  @Post('/uploadfoto/:id')
  @UseGuards(JwtAuthGuard, UserOwnershipGuard)
  @UseInterceptors(FileInterceptor('foto', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const filename = `${uuidv4()}${path.extname(file.originalname)}`;
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      //console.log('Request user:', req.user);
      if (file.mimetype.startsWith('image/')) {
        callback(null, true);
      } else {
        callback(new Error('Tipo de arquivo inválido'), false);
      }
    },
  }))
  async upload(@Param('id', ParseIntPipe) id: number, @Request() req, @UploadedFile() file: Express.Multer.File) {
    try {
      //console.log('Request user:', req.user);
      if (!req.user || !id) {
        throw new InternalServerErrorException('Usuário não autenticado');
      }
      return await this.usuariosService.uploadFoto(req.user.dados.id, file ? file.filename : undefined);
    } catch (error) {
      console.error('Erro ao adicionar imagem', error);
      throw new InternalServerErrorException('Erro ao adicionar imagem');
    }
  }

  @Delete('/removefoto/:id')
  @UseGuards(JwtAuthGuard, UserOwnershipGuard)
  async removerfoto(@Param('id', ParseIntPipe) id: number,) {
    return await this.usuariosService.removeFoto(id);
  }
}