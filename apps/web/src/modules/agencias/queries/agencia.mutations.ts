import {
    useMutation,
    useQueryClient,
} from '@tanstack/vue-query'

import { createAgencia } from '../services/agencia.service'

export function useCreateAgenciaMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createAgencia,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['agencias'],
            })
        },
    })
}