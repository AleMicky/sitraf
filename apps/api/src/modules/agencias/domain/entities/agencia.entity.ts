import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../../../shared/domain/entities/base.entity';
import { CreateAgenciaParams } from '../types/agencia.types';

@Entity({ name: 'tagencias', schema: 'ope' })
@Index('uk_agencias_codigo', ['codigo'], { unique: true })
export class AgenciaEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 20,
  })
  codigo!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  nombre!: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  direccion?: string | null;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  telefono?: string | null;

  @Column({
    type: 'boolean',
    default: true,
  })
  activo!: boolean;

  static create(params: CreateAgenciaParams): AgenciaEntity {
    const agencia = new AgenciaEntity();
    agencia.codigo = params.codigo.trim().toUpperCase();
    agencia.nombre = params.nombre.trim();
    agencia.direccion = params.direccion ?? null;
    agencia.telefono = params.telefono ?? null;
    agencia.activo = params.activo ?? true;
    return agencia;
  }
  update(params: CreateAgenciaParams): void {
    this.assignDefined({
      codigo: params.codigo?.trim().toUpperCase(),
      nombre: params.nombre?.trim(),
      direccion: params.direccion,
      telefono: params.telefono,
      activo: params.activo,
    });
  }
}
