import { RutaEntity } from '../entities/ruta.entity';
import { PaginationQueryDto } from '../../../../shared/application/dto/pagination-query.dto';
import { PaginatedResultDto } from '../../../../shared/application/dto/paginated-result.dto';

export const RUTA_REPOSITORY = Symbol('RUTA_REPOSITORY');

export interface RutaRepository {
  create(entity: RutaEntity): Promise<RutaEntity>;
  findAll(query: PaginationQueryDto): Promise<PaginatedResultDto<RutaEntity>>;
  findById(id: string): Promise<RutaEntity | null>;
  findByCodigo(codigo: string): Promise<RutaEntity | null>;
  update(ruta: RutaEntity): Promise<RutaEntity>;
}
