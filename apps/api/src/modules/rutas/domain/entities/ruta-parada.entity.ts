import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../../shared/domain/entities/base.entity';
import { AgenciaEntity } from '../../../agencias/domain/entities/agencia.entity';
import { RutaEntity } from './ruta.entity';

@Entity({
  name: 'truta_paradas',
  schema: 'ope',
})
@Index('uk_ruta_paradas_ruta_orden', ['rutaId', 'orden'], {
  unique: true,
})
@Index('idx_ruta_paradas_ruta', ['rutaId'])
@Index('idx_ruta_paradas_agencia', ['agenciaId'])
export class RutaParadaEntity extends BaseEntity {
  @Column({
    name: 'ruta_id',
    type: 'uuid',
  })
  rutaId!: string;

  @ManyToOne(() => RutaEntity, (ruta) => ruta.paradas, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'ruta_id',
    foreignKeyConstraintName: 'fk_ruta_paradas_ruta',
  })
  ruta!: RutaEntity;

  @Column({
    name: 'agencia_id',
    type: 'uuid',
  })
  agenciaId!: string;

  @ManyToOne(() => AgenciaEntity, {
    nullable: false,
  })
  @JoinColumn({
    name: 'agencia_id',
    foreignKeyConstraintName: 'fk_ruta_paradas_agencia',
  })
  agencia!: AgenciaEntity;

  @Column({
    type: 'integer',
  })
  orden!: number;

  @Column({
    name: 'distancia_acumulada_km',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  distanciaAcumuladaKm!: string | null;

  @Column({
    name: 'tiempo_estimado_minutos',
    type: 'integer',
    nullable: true,
  })
  tiempoEstimadoMinutos!: number | null;
}
