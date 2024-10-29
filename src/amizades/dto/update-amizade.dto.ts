import { PartialType } from '@nestjs/mapped-types';
import { CreateAmizadeDto } from './create-amizade.dto';

export class UpdateAmizadeDto extends PartialType(CreateAmizadeDto) {
    aceito: boolean;
}
