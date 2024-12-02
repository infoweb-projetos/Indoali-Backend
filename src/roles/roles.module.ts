import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [PersistenciaModule]
})
export class RolesModule {}
