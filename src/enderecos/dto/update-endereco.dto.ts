import { PartialType } from '@nestjs/mapped-types';
import { CreateEnderecoDto } from './create-endereco.dto';

export class UpdateEnderecoDto extends PartialType(CreateEnderecoDto) {
    descricao:string;
    cidade:string;
    bairro:string;
    pais:string;
    detalhes?:string;
}
