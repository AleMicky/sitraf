import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { CreateAgenciaDto } from '../../application/dto/create-agencia.dto';
import { UpdateAgenciaDto } from '../../application/dto/update-agencia.dto';

import { CreateAgenciaUseCase } from '../../application/use-cases/create-agencia.use-case';
import { ListAgenciasUseCase } from '../../application/use-cases/list-agencias.use-case';
import { UpdateAgenciaUseCase } from '../../application/use-cases/update-agencia.use-case';
import { PaginationQueryDto } from '../../../../shared/application/dto/pagination-query.dto';

@ApiTags('Agencias')
@Controller('agencias')
export class AgenciasController {
  constructor(
    private readonly createAgenciaUseCase: CreateAgenciaUseCase,
    private readonly listAgenciasUseCase: ListAgenciasUseCase,
    private readonly updateAgenciaUseCase: UpdateAgenciaUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateAgenciaDto) {
    return this.createAgenciaUseCase.execute(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.listAgenciasUseCase.execute(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAgenciaDto) {
    return this.updateAgenciaUseCase.execute(id, dto);
  }
}
