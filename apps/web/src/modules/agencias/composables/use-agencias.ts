import { computed, type Ref } from 'vue'

import { useQuery } from '@tanstack/vue-query'

import { getAgencias } from '../api/agencias.api'

import type { AgenciaSearchParams } from '../types/agencia.types'

export function useAgencias(params: Ref<AgenciaSearchParams>) {
  const queryKey = computed(() => ['agencias', params.value])

  return useQuery({
    queryKey,
    queryFn: () => getAgencias(params.value),
  })
}
