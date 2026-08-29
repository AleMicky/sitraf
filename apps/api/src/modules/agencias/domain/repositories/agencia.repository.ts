import { AgenciaEntity } from '../entities/agencia.entity';

export const AGENCIA_REPOSITORY = Symbol('AGENCIA_REPOSITORY');
export interface AgenciaRepository {
  create(agencia: AgenciaEntity): Promise<AgenciaEntity>;
  findAll(): Promise<AgenciaEntity[]>;
  findById(id: string): Promise<AgenciaEntity | null>;
  findByCodigo(codigo: string): Promise<AgenciaEntity | null>;
  save(agencia: AgenciaEntity): Promise<AgenciaEntity>;
}
