import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    titulo:string;
    diasemana:string;
    datahora:Date;
    usuarios_id:string;
    lugare_id:number;
}
