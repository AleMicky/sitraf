import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRutaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  codigo!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre!: string;

  @IsUUID()
  agenciaOrigenId!: string;

  @IsUUID()
  agenciaDestinoId!: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  distanciaKm?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  duracionMinutos?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
