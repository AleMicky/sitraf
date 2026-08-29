import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  // Después lo llenaremos desde Keycloak
  // @Column({ name: 'created_by', nullable: true })
  // createdBy?: string;

  // @Column({ name: 'updated_by', nullable: true })
  // updatedBy?: string;
}
