import { useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { getAgencias } from '../services/agencia.service'

export function useAgenciasQuery(
    page: Ref<number>,
    pageSize: Ref<number>,
    search: Ref<string>,
) {
    return useQuery({
        queryKey: computed(() => [
            'agencias',
            {
                page: page.value,
                pageSize: pageSize.value,
                search: search.value,
            },
        ]),

        queryFn: () =>
            getAgencias({
                page: page.value,
                pageSize: pageSize.value,
                search: search.value || undefined,
            }),
    })
}