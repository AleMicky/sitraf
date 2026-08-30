<script setup lang="ts">
import { useRouter } from 'vue-router'

import { NCard, useMessage } from 'naive-ui'

import AgenciaForm from '../components/AgenciaForm.vue'

import { useCreateAgencia } from '../composables/use-agencia-mutations'

import type { CreateAgenciaRequest } from '../types/agencia.types'

const router = useRouter()
const message = useMessage()

const mutation = useCreateAgencia()

async function handleSubmit(payload: CreateAgenciaRequest) {
  await mutation.mutateAsync(payload)

  message.success('Agencia creada correctamente')

  await router.push({
    name: 'agencias',
  })
}
</script>

<template>
  <NCard title="Nueva agencia">
    <AgenciaForm
      :loading="mutation.isPending.value"
      @submit="handleSubmit"
      @cancel="
        router.push({
          name: 'agencias',
        })
      "
    />
  </NCard>
</template>
