import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutaEntity } from './domain/entities/ruta.entity';
import { RutasController } from './presentation/controllers/rutas.controller';
import { CreateRutaUseCase } from './application/use-cases/create-ruta.use-case';
import { ListRutasUseCase } from './application/use-cases/list-rutas.use-case';
import { UpdateRutaUseCase } from './application/use-cases/update-ruta.use-case';
import { RUTA_REPOSITORY } from './domain/repositories/ruta.repository';
import { TypeOrmRutaRepository } from './infrastructure/persistence/repositories/typeorm-ruta.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RutaEntity])],
  controllers: [RutasController],
  providers: [
    CreateRutaUseCase,
    ListRutasUseCase,
    UpdateRutaUseCase,
    {
      provide: RUTA_REPOSITORY,
      useClass: TypeOrmRutaRepository,
    },
  ],
  exports: [RUTA_REPOSITORY],
})
export class RutasModule {}
