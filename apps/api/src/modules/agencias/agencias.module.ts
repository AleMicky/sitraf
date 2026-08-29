import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgenciaEntity } from './domain/entities/agencia.entity';
import { AgenciasController } from './presentation/controllers/agencias.controller';
import { ListAgenciasUseCase } from './application/use-cases/list-agencias.use-case';
import { UpdateAgenciaUseCase } from './application/use-cases/update-agencia.use-case';
import { CreateAgenciaUseCase } from './application/use-cases/create-agencia.use-case';
import { AGENCIA_REPOSITORY } from './domain/repositories/agencia.repository';
import { TypeOrmAgenciaRepository } from './infrastructure/persistence/repositories/typeorm-agencia.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AgenciaEntity])],
  controllers: [AgenciasController],
  providers: [
    CreateAgenciaUseCase,
    ListAgenciasUseCase,
    UpdateAgenciaUseCase,

    {
      provide: AGENCIA_REPOSITORY,
      useClass: TypeOrmAgenciaRepository,
    },
  ],

  exports: [AGENCIA_REPOSITORY],
})
export class AgenciasModule {}
