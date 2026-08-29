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
import { CreateRutaDto } from '../../application/dto/create-ruta.dto';
import { UpdateRutaDto } from '../../application/dto/update-ruta.dto';
import { CreateRutaUseCase } from '../../application/use-cases/create-ruta.use-case';
import { ListRutasUseCase } from '../../application/use-cases/list-rutas.use-case';
import { UpdateRutaUseCase } from '../../application/use-cases/update-ruta.use-case';
import { PaginationQueryDto } from '../../../../shared/application/dto/pagination-query.dto';

@ApiTags('Rutas')
@Controller('rutas')
export class RutasController {
  constructor(
    private readonly createRutaUseCase: CreateRutaUseCase,
    private readonly listRutasUseCase: ListRutasUseCase,
    private readonly updateRutaUseCase: UpdateRutaUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateRutaDto) {
    return this.createRutaUseCase.execute(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.listRutasUseCase.execute(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRutaDto) {
    return this.updateRutaUseCase.execute(id, dto);
  }
}
