export type CreateAgenciaParams = {
  codigo: string;
  nombre: string;
  direccion?: string | null;
  telefono?: string | null;
  activo?: boolean;
};

export type UpdateAgenciaParams = {
  codigo?: string;
  nombre?: string;
  direccion?: string | null;
  telefono?: string | null;
  activo?: boolean;
};
