import { Inject, Injectable } from '@nestjs/common';
import { RutaEntity } from '../../domain/entities/ruta.entity';
import {
  RUTA_REPOSITORY,
  type RutaRepository,
} from '../../domain/repositories/ruta.repository';
import { PaginationQueryDto } from '../../../../shared/application/dto/pagination-query.dto';
import { PaginatedResultDto } from '../../../../shared/application/dto/paginated-result.dto';

@Injectable()
export class ListRutasUseCase {
  constructor(
    @Inject(RUTA_REPOSITORY)
    private readonly rutaRepository: RutaRepository,
  ) {}

  async execute(
    query: PaginationQueryDto,
  ): Promise<PaginatedResultDto<RutaEntity>> {
    return await this.rutaRepository.findAll(query);
  }
}
