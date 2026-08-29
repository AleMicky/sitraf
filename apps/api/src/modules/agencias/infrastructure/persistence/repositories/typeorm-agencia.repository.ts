import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AgenciaEntity } from '../../../domain/entities/agencia.entity';
import { AgenciaRepository } from '../../../domain/repositories/agencia.repository';
import { PaginationQueryDto } from '../../../../../shared/application/dto/pagination-query.dto';
import { PaginatedResultDto } from '../../../../../shared/application/dto/paginated-result.dto';
import { paginate } from '../../../../../shared/infrastructure/persistence/pagination.helper';

@Injectable()
export class TypeOrmAgenciaRepository implements AgenciaRepository {
  constructor(
    @InjectRepository(AgenciaEntity)
    private readonly repository: Repository<AgenciaEntity>,
  ) {}

  async create(agencia: AgenciaEntity): Promise<AgenciaEntity> {
    return await this.repository.save(agencia);
  }

  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResultDto<AgenciaEntity>> {
    const qb = this.repository.createQueryBuilder('agencia');
    if (query.search?.trim()) {
      const term = `%${query.search.trim()}%`;

      qb.andWhere(
        `(
        agencia.codigo ILIKE :term
        OR agencia.nombre ILIKE :term
        OR agencia.direccion ILIKE :term
        OR agencia.telefono ILIKE :term
      )`,
        { term },
      );
    }

    qb.orderBy('agencia.nombre', 'ASC');

    return paginate(qb, query);
  }

  async findById(id: string): Promise<AgenciaEntity | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findByCodigo(codigo: string): Promise<AgenciaEntity | null> {
    return await this.repository.findOne({
      where: {
        codigo,
      },
    });
  }

  async save(agencia: AgenciaEntity): Promise<AgenciaEntity> {
    return await this.repository.save(agencia);
  }
}
