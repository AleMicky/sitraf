import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../../../shared/domain/entities/base.entity';

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
}
