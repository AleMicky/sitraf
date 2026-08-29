import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  RUTA_REPOSITORY,
  type RutaRepository,
} from '../../domain/repositories/ruta.repository';
import {
  AGENCIA_REPOSITORY,
  type AgenciaRepository,
} from '../../../agencias/domain/repositories/agencia.repository';

@Injectable()
export class RutaValidationService {
  constructor(
    @Inject(RUTA_REPOSITORY)
    private readonly rutaRepository: RutaRepository,

    @Inject(AGENCIA_REPOSITORY)
    private readonly agenciaRepository: AgenciaRepository,
  ) {}

  async validarCodigoUnico(codigo: string, excludeId?: string): Promise<void> {
    const codigoNormalizado = codigo.trim().toUpperCase();
    const existente = await this.rutaRepository.findByCodigo(codigoNormalizado);
    if (!existente) {
      return;
    }
    if (excludeId && existente.id === excludeId) {
      return;
    }
    throw new ConflictException(
      `Ya existe una ruta con código ${codigoNormalizado}`,
    );
  }

  async validarAgencias(
    agenciaOrigenId: string,
    agenciaDestinoId: string,
  ): Promise<void> {
    if (agenciaOrigenId === agenciaDestinoId) {
      throw new BadRequestException(
        'La agencia de origen y destino no pueden ser iguales',
      );
    }

    const [agenciaOrigen, agenciaDestino] = await Promise.all([
      this.agenciaRepository.findById(agenciaOrigenId),
      this.agenciaRepository.findById(agenciaDestinoId),
    ]);

    if (!agenciaOrigen) {
      throw new NotFoundException('La agencia de origen no existe');
    }

    if (!agenciaDestino) {
      throw new NotFoundException('La agencia de destino no existe');
    }

    if (!agenciaOrigen.activo) {
      throw new BadRequestException(
        `La agencia de origen "${agenciaOrigen.nombre}" está inactiva`,
      );
    }
    if (!agenciaDestino.activo) {
      throw new BadRequestException(
        `La agencia de destino "${agenciaDestino.nombre}" está inactiva`,
      );
    }
  }
}
