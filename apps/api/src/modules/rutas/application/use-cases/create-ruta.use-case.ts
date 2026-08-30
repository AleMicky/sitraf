import { Inject, Injectable } from '@nestjs/common';
import { CreateRutaDto } from '../dto/create-ruta.dto';
import { RutaEntity } from '../../domain/entities/ruta.entity';
import {
  RUTA_REPOSITORY,
  type RutaRepository,
} from '../../domain/repositories/ruta.repository';
import { RutaValidationService } from '../services/ruta-validation.service';

@Injectable()
export class CreateRutaUseCase {
  constructor(
    @Inject(RUTA_REPOSITORY)
    private readonly rutaRepository: RutaRepository,

    private readonly rutaValidationService: RutaValidationService,
  ) {}

  async execute(dto: CreateRutaDto): Promise<RutaEntity> {
    await this.rutaValidationService.validarCodigoUnico(dto.codigo);
    await this.rutaValidationService.validarAgencias(
      dto.agenciaOrigenId,
      dto.agenciaDestinoId,
    );

    const ruta = RutaEntity.create({
      codigo: dto.codigo,
      nombre: dto.nombre,
      agenciaOrigenId: dto.agenciaOrigenId,
      agenciaDestinoId: dto.agenciaDestinoId,
      distanciaKm: dto.distanciaKm,
      duracionMinutos: dto.duracionMinutos,
      activo: dto.activo,
    });

    return await this.rutaRepository.create(ruta);
  }
}
