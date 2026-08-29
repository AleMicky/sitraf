import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../../shared/domain/entities/base.entity';
import { AgenciaEntity } from '../../../agencias/domain/entities/agencia.entity';
import { RutaParadaEntity } from './ruta-parada.entity';
import { CreateRutaParams, UpdateRutaParams } from '../types/ruta.types';

@Entity({ name: 'trutas', schema: 'ope' })
@Index('uk_rutas_codigo', ['codigo'], {
  unique: true,
})
@Index('idx_rutas_agencia_origen', ['agenciaOrigenId'])
@Index('idx_rutas_agencia_destino', ['agenciaDestinoId'])
export class RutaEntity extends BaseEntity {
  @Column({
    length: 30,
  })
  codigo!: string;

  @Column({
    length: 150,
  })
  nombre!: string;

  @Column({
    name: 'agencia_origen_id',
    type: 'uuid',
  })
  agenciaOrigenId!: string;

  @ManyToOne(() => AgenciaEntity, {
    nullable: false,
  })
  @JoinColumn({
    name: 'agencia_origen_id',
    foreignKeyConstraintName: 'fk_rutas_agencia_origen',
  })
  agenciaOrigen!: AgenciaEntity;

  @Column({
    name: 'agencia_destino_id',
    type: 'uuid',
  })
  agenciaDestinoId!: string;

  @ManyToOne(() => AgenciaEntity, {
    nullable: false,
  })
  @JoinColumn({
    name: 'agencia_destino_id',
    foreignKeyConstraintName: 'fk_rutas_agencia_destino',
  })
  agenciaDestino!: AgenciaEntity;

  @Column({
    name: 'distancia_km',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  distanciaKm!: string | null;

  @Column({
    name: 'duracion_minutos',
    type: 'integer',
    nullable: true,
  })
  duracionMinutos!: number | null;

  @Column({
    default: true,
  })
  activo!: boolean;

  @OneToMany(() => RutaParadaEntity, (parada) => parada.ruta)
  paradas!: RutaParadaEntity[];

  static create(params: CreateRutaParams): RutaEntity {
    const ruta = new RutaEntity();
    ruta.codigo = params.codigo.trim().toUpperCase();
    ruta.nombre = params.nombre.trim();
    ruta.agenciaOrigenId = params.agenciaOrigenId;
    ruta.agenciaDestinoId = params.agenciaDestinoId;
    ruta.distanciaKm =
      params.distanciaKm != null ? String(params.distanciaKm) : null;
    ruta.duracionMinutos = params.duracionMinutos ?? null;
    ruta.activo = params.activo ?? true;
    return ruta;
  }

  update(params: UpdateRutaParams): void {
    this.assignDefined({
      codigo: params.codigo?.trim().toUpperCase(),
      nombre: params.nombre?.trim(),
      agenciaOrigenId: params.agenciaOrigenId,
      agenciaDestinoId: params.agenciaDestinoId,
      distanciaKm:
        params.distanciaKm === null ? null : params.distanciaKm?.toString(),
      duracionMinutos: params.duracionMinutos,
      activo: params.activo,
    });
  }
}
