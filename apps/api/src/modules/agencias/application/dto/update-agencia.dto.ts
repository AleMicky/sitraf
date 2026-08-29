import { PartialType } from '@nestjs/swagger';

import { CreateAgenciaDto } from './create-agencia.dto';

export class UpdateAgenciaDto extends PartialType(CreateAgenciaDto) {}
