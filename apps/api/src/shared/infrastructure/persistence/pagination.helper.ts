import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { PaginationQueryDto } from '../../application/dto/pagination-query.dto';
import { PaginatedResultDto } from '../../application/dto/paginated-result.dto';

export async function paginate<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  query: PaginationQueryDto,
): Promise<PaginatedResultDto<T>> {
  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 20;

  qb.skip((page - 1) * pageSize);
  qb.take(pageSize);

  const [data, total] = await qb.getManyAndCount();

  return new PaginatedResultDto(data, page, pageSize, total);
}
