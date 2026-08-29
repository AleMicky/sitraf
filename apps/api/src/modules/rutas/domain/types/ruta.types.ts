export type CreateRutaParams = {
  codigo: string;
  nombre: string;
  agenciaOrigenId: string;
  agenciaDestinoId: string;
  distanciaKm?: number | null;
  duracionMinutos?: number | null;
  activo?: boolean;
};

export type UpdateRutaParams = {
  codigo?: string;
  nombre?: string;
  agenciaOrigenId?: string;
  agenciaDestinoId?: string;
  distanciaKm?: number | null;
  duracionMinutos?: number | null;
  activo?: boolean;
};
