import { Inject, Injectable } from '@nestjs/common';

import { AgenciaEntity } from '../../domain/entities/agencia.entity';

import {
  AGENCIA_REPOSITORY,
  type AgenciaRepository,
} from '../../domain/repositories/agencia.repository';

@Injectable()
export class ListAgenciasUseCase {
  constructor(
    @Inject(AGENCIA_REPOSITORY)
    private readonly agenciaRepository: AgenciaRepository,
  ) {}

  async execute(): Promise<AgenciaEntity[]> {
    return await this.agenciaRepository.findAll();
  }
}
