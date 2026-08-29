import { Inject, Injectable } from '@nestjs/common';

import { AgenciaEntity } from '../../domain/entities/agencia.entity';

import {
  AGENCIA_REPOSITORY,
  type AgenciaRepository,
} from '../../domain/repositories/agencia.repository';
import { PaginationQueryDto } from '../../../../shared/application/dto/pagination-query.dto';
import { PaginatedResultDto } from '../../../../shared/application/dto/paginated-result.dto';

@Injectable()
export class ListAgenciasUseCase {
  constructor(
    @Inject(AGENCIA_REPOSITORY)
    private readonly agenciaRepository: AgenciaRepository,
  ) {}

  async execute(
    query: PaginationQueryDto,
  ): Promise<PaginatedResultDto<AgenciaEntity>> {
    return await this.agenciaRepository.findAll(query);
  }
}
