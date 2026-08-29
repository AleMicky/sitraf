import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RutaEntity } from '../../../domain/entities/ruta.entity';
import { RutaRepository } from '../../../domain/repositories/ruta.repository';
import { PaginationQueryDto } from '../../../../../shared/application/dto/pagination-query.dto';
import { PaginatedResultDto } from '../../../../../shared/application/dto/paginated-result.dto';
import { paginate } from '../../../../../shared/infrastructure/persistence/pagination.helper';

@Injectable()
export class TypeOrmRutaRepository implements RutaRepository {
  constructor(
    @InjectRepository(RutaEntity)
    private readonly repository: Repository<RutaEntity>,
  ) {}
  async create(ruta: RutaEntity): Promise<RutaEntity> {
    return this.repository.save(ruta);
  }

  async update(ruta: RutaEntity): Promise<RutaEntity> {
    return this.repository.save(ruta);
  }

  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResultDto<RutaEntity>> {
    const qb = this.repository
      .createQueryBuilder('ruta')
      .leftJoinAndSelect('ruta.agenciaOrigen', 'agenciaOrigen')
      .leftJoinAndSelect('ruta.agenciaDestino', 'agenciaDestino');

    if (query.search?.trim()) {
      const term = `%${query.search.trim()}%`;

      qb.andWhere(
        `(
          ruta.codigo ILIKE :term
          OR ruta.nombre ILIKE :term
          OR agenciaOrigen.codigo ILIKE :term
          OR agenciaOrigen.nombre ILIKE :term
          OR agenciaDestino.codigo ILIKE :term
          OR agenciaDestino.nombre ILIKE :term
        )`,
        { term },
      );
    }

    qb.orderBy('ruta.nombre', 'ASC');
    return paginate(qb, query);
  }

  async findById(id: string): Promise<RutaEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        agenciaOrigen: true,
        agenciaDestino: true,
        paradas: {
          agencia: true,
        },
      },
    });
  }

  findByCodigo(codigo: string): Promise<RutaEntity | null> {
    return this.repository.findOne({
      where: { codigo },
    });
  }
}
