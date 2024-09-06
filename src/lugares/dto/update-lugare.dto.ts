import { PartialType } from '@nestjs/mapped-types';
import { CreateLugareDto } from './create-lugare.dto';

export class UpdateLugareDto extends PartialType(CreateLugareDto) {
    descricao?: string;
    name: string;
    endereco: string;
}
