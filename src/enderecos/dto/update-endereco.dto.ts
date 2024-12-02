import { PartialType } from '@nestjs/mapped-types';
import { CreateEnderecoDto } from './create-endereco.dto';

export class UpdateEnderecoDto extends PartialType(CreateEnderecoDto) {
    rua:string;
    numero:number;
    cidade:string;
    bairro:string;
    estado:string;
    nome:string;
    detalhes?:string;
}
