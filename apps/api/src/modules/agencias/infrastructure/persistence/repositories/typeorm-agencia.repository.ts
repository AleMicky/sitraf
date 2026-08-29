import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AgenciaEntity } from '../../../domain/entities/agencia.entity';
import { AgenciaRepository } from '../../../domain/repositories/agencia.repository';

@Injectable()
export class TypeOrmAgenciaRepository implements AgenciaRepository {
  constructor(
    @InjectRepository(AgenciaEntity)
    private readonly repository: Repository<AgenciaEntity>,
  ) {}

  async create(agencia: AgenciaEntity): Promise<AgenciaEntity> {
    return await this.repository.save(agencia);
  }

  async findAll(): Promise<AgenciaEntity[]> {
    return await this.repository.find({
      order: {
        nombre: 'ASC',
      },
    });
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
