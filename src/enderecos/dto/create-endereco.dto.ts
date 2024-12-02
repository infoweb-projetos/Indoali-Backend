export class CreateEnderecoDto {
    rua:string;
    numero:number;
    cidade:string;
    bairro:string;
    estado:string;
    nome:string;
    detalhes?:string;
    id_usuario:number;
}
