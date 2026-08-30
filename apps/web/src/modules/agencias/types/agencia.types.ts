export interface Agencia {
  id: string
  codigo: string
  nombre: string
  direccion: string | null
  telefono: string | null
  activo: boolean

  createdAt: string
  updatedAt: string
}

export interface CreateAgenciaRequest {
  codigo: string
  nombre: string
  direccion?: string | null
  telefono?: string | null
  activo?: boolean
}

export interface UpdateAgenciaRequest {
  codigo?: string
  nombre?: string
  direccion?: string | null
  telefono?: string | null
  activo?: boolean
}

export interface AgenciaSearchParams {
  page?: number
  limit?: number
  search?: string
  activo?: boolean
}
