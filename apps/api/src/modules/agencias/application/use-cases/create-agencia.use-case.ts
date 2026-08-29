import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { CreateAgenciaDto } from '../dto/create-agencia.dto';

import { AgenciaEntity } from '../../domain/entities/agencia.entity';
import {
  AGENCIA_REPOSITORY,
  type AgenciaRepository,
} from '../../domain/repositories/agencia.repository';

@Injectable()
export class CreateAgenciaUseCase {
  constructor(
    @Inject(AGENCIA_REPOSITORY)
    private readonly agenciaRepository: AgenciaRepository,
  ) {}

  async execute(dto: CreateAgenciaDto): Promise<AgenciaEntity> {
    const codigo = dto.codigo.trim().toUpperCase();
    const existente = await this.agenciaRepository.findByCodigo(codigo);

    if (existente) {
      throw new ConflictException(`Ya existe una agencia con código ${codigo}`);
    }

    const agencia = new AgenciaEntity();

    agencia.codigo = codigo;
    agencia.nombre = dto.nombre.trim();
    agencia.direccion = dto.direccion?.trim() ?? null;
    agencia.telefono = dto.telefono?.trim() ?? null;
    agencia.activo = dto.activo ?? true;

    return await this.agenciaRepository.create(agencia);
  }
}
