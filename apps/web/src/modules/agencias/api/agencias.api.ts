import { httpClient } from '@/shared/api/http-client'

import type {
  Agencia,
  AgenciaSearchParams,
  CreateAgenciaRequest,
  UpdateAgenciaRequest,
} from '../types/agencia.types'

import type { PaginatedResponse } from '@/shared/types/paginated-response'

export async function getAgencias(
  params: AgenciaSearchParams,
): Promise<PaginatedResponse<Agencia>> {
  const { data } = await httpClient.get('/agencias', {
    params,
  })

  return data
}

export async function getAgenciaById(id: string): Promise<Agencia> {
  const { data } = await httpClient.get(`/agencias/${id}`)

  return data
}

export async function createAgencia(payload: CreateAgenciaRequest): Promise<Agencia> {
  const { data } = await httpClient.post('/agencias', payload)

  return data
}

export async function updateAgencia(id: string, payload: UpdateAgenciaRequest): Promise<Agencia> {
  const { data } = await httpClient.patch(`/agencias/${id}`, payload)

  return data
}
