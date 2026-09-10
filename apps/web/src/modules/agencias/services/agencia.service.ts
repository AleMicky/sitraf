import { apiClient } from '@/core/api/api-client'
import type {
    Agencia,
    AgenciaResponse,
} from '../types/agencia.types'
import type { AgenciaFormValues } from '../validations/agencia.schema'

export interface GetAgenciasParams {
    page?: number
    pageSize?: number
    search?: string
}

export const getAgencias = async (
    params?: GetAgenciasParams,
): Promise<AgenciaResponse> => {
    const { data } = await apiClient.get<AgenciaResponse>('/agencias', {
        params: {
            page: params?.page,
            pageSize: params?.pageSize,
            search: params?.search ? params.search : undefined,
        },
    })

    return data
}


export const createAgencia = async (
    payload: AgenciaFormValues,
): Promise<Agencia> => {
    const { data } = await apiClient.post('/agencias', payload)

    return data
}