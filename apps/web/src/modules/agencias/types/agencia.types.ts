export interface Agencia {
    id: string
    codigo: string
    nombre: string
    direccion?: string | null
    telefono?: string | null
    activo?: boolean
    createdAt?: string
    updatedAt?: string
}

export interface AgenciaResponse {
    data: Agencia[]
    total: number
    page: number
    pageSize: number
    totalPages: number
}