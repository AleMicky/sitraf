import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRutaDto } from '../dto/update-ruta.dto';
import { RutaEntity } from '../../domain/entities/ruta.entity';
import {
  RUTA_REPOSITORY,
  type RutaRepository,
} from '../../domain/repositories/ruta.repository';
import { RutaValidationService } from '../services/ruta-validation.service';

@Injectable()
export class UpdateRutaUseCase {
  constructor(
    @Inject(RUTA_REPOSITORY)
    private readonly rutaRepository: RutaRepository,
    private readonly rutaValidationService: RutaValidationService,
  ) {}

  async execute(id: string, dto: UpdateRutaDto): Promise<RutaEntity> {
    const ruta = await this.rutaRepository.findById(id);

    if (!ruta) {
      throw new NotFoundException('La ruta no existe');
    }

    if (dto.codigo !== undefined) {
      await this.rutaValidationService.validarCodigoUnico(dto.codigo, ruta.id);
    }

    const agenciaOrigenId = dto.agenciaOrigenId ?? ruta.agenciaOrigenId;
    const agenciaDestinoId = dto.agenciaDestinoId ?? ruta.agenciaDestinoId;

    if (
      dto.agenciaOrigenId !== undefined ||
      dto.agenciaDestinoId !== undefined
    ) {
      await this.rutaValidationService.validarAgencias(
        agenciaOrigenId,
        agenciaDestinoId,
      );
    }

    ruta.update({
      codigo: dto.codigo,
      nombre: dto.nombre,
      agenciaOrigenId: dto.agenciaOrigenId,
      agenciaDestinoId: dto.agenciaDestinoId,
      distanciaKm: dto.distanciaKm,
      duracionMinutos: dto.duracionMinutos,
      activo: dto.activo,
    });

    return this.rutaRepository.update(ruta);
  }
}
