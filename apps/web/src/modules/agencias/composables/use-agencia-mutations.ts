import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { createAgencia, updateAgencia } from '../api/agencias.api'

import type { CreateAgenciaRequest, UpdateAgenciaRequest } from '../types/agencia.types'

export function useCreateAgencia() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateAgenciaRequest) => createAgencia(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['agencias'],
      })
    },
  })
}

export function useUpdateAgencia() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAgenciaRequest }) =>
      updateAgencia(id, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['agencias'],
      })
    },
  })
}
