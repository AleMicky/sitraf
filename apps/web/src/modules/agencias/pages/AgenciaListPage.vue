<script setup lang="ts">
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'

import { NButton, NCard, NDataTable, NInput, NSpace } from 'naive-ui'

import { Plus, Search } from '@lucide/vue'

import { useAgencias } from '../composables/use-agencias'

const router = useRouter()

const params = ref({
  page: 1,
  limit: 10,
  search: '',
})

const { data, isLoading } = useAgencias(params)

const columns = [
  {
    title: 'Código',
    key: 'codigo',
  },
  {
    title: 'Nombre',
    key: 'nombre',
  },
  {
    title: 'Teléfono',
    key: 'telefono',
  },
  {
    title: 'Estado',
    key: 'activo',
    render(row: any) {
      return row.activo ? 'Activo' : 'Inactivo'
    },
  },
  {
    title: 'Acciones',
    key: 'acciones',
    render(row: any) {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => {
            router.push({
              name: 'agencias-edit',
              params: {
                id: row.id,
              },
            })
          },
        },
        {
          default: () => 'Editar',
        },
      )
    },
  },
]
</script>

<template>
  <NCard title="Agencias">
    <NSpace justify="space-between" style="margin-bottom: 16px">
      <NInput
        v-model:value="params.search"
        clearable
        placeholder="Buscar agencia..."
        style="width: 320px"
      >
        <template #prefix>
          <Search :size="18" />
        </template>
      </NInput>

      <NButton
        type="primary"
        @click="
          router.push({
            name: 'agencias-create',
          })
        "
      >
        <template #icon>
          <Plus :size="18" />
        </template>

        Nueva agencia
      </NButton>
    </NSpace>

    <NDataTable
      :loading="isLoading"
      :columns="columns"
      :data="data?.data ?? []"
      :pagination="{
        page: params.page,
        pageSize: params.limit,
        itemCount: data?.total ?? 0,
        onChange: (page: number) => {
          params.page = page
        },
      }"
    />
  </NCard>
</template>
