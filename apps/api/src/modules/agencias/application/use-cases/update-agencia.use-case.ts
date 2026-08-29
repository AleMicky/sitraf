import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateAgenciaDto } from '../dto/update-agencia.dto';

import { AgenciaEntity } from '../../domain/entities/agencia.entity';

import {
  AGENCIA_REPOSITORY,
  type AgenciaRepository,
} from '../../domain/repositories/agencia.repository';

@Injectable()
export class UpdateAgenciaUseCase {
  constructor(
    @Inject(AGENCIA_REPOSITORY)
    private readonly agenciaRepository: AgenciaRepository,
  ) {}

  async execute(id: string, dto: UpdateAgenciaDto): Promise<AgenciaEntity> {
    const agencia = await this.agenciaRepository.findById(id);

    if (!agencia) {
      throw new NotFoundException('Agencia no encontrada');
    }

    if (dto.codigo !== undefined) {
      agencia.codigo = dto.codigo.trim().toUpperCase();
    }

    if (dto.nombre !== undefined) {
      agencia.nombre = dto.nombre.trim();
    }

    if (dto.direccion !== undefined) {
      agencia.direccion = dto.direccion?.trim() || null;
    }

    if (dto.telefono !== undefined) {
      agencia.telefono = dto.telefono?.trim() || null;
    }

    if (dto.activo !== undefined) {
      agencia.activo = dto.activo;
    }

    return await this.agenciaRepository.save(agencia);
  }
}
