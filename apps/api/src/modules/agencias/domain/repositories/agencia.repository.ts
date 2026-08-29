import { AgenciaEntity } from '../entities/agencia.entity';
import { PaginationQueryDto } from '../../../../shared/application/dto/pagination-query.dto';
import { PaginatedResultDto } from '../../../../shared/application/dto/paginated-result.dto';

export const AGENCIA_REPOSITORY = Symbol('AGENCIA_REPOSITORY');
export interface AgenciaRepository {
  create(agencia: AgenciaEntity): Promise<AgenciaEntity>;
  findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResultDto<AgenciaEntity>>;
  findById(id: string): Promise<AgenciaEntity | null>;
  findByCodigo(codigo: string): Promise<AgenciaEntity | null>;
  save(agencia: AgenciaEntity): Promise<AgenciaEntity>;
}
