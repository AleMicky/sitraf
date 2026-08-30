<script setup lang="ts">
import { reactive } from 'vue'

import { NButton, NForm, NFormItem, NInput, NSpace, NSwitch } from 'naive-ui'

import type { CreateAgenciaRequest } from '../types/agencia.types'

const props = defineProps<{
  initialValues?: Partial<CreateAgenciaRequest>
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [payload: CreateAgenciaRequest]
  cancel: []
}>()

const form = reactive<CreateAgenciaRequest>({
  codigo: props.initialValues?.codigo ?? '',
  nombre: props.initialValues?.nombre ?? '',
  direccion: props.initialValues?.direccion ?? null,
  telefono: props.initialValues?.telefono ?? null,
  activo: props.initialValues?.activo ?? true,
})

function submit() {
  emit('submit', {
    ...form,
    codigo: form.codigo.trim().toUpperCase(),
    nombre: form.nombre.trim(),
    direccion: form.direccion?.trim() || null,
    telefono: form.telefono?.trim() || null,
  })
}
</script>

<template>
  <NForm @submit.prevent="submit">
    <NFormItem label="Código">
      <NInput v-model:value="form.codigo" placeholder="Ej. CBBA-CENTRAL" />
    </NFormItem>

    <NFormItem label="Nombre">
      <NInput v-model:value="form.nombre" placeholder="Ej. Agencia Central Cochabamba" />
    </NFormItem>

    <NFormItem label="Dirección">
      <NInput v-model:value="form.direccion" type="textarea" placeholder="Dirección" />
    </NFormItem>

    <NFormItem label="Teléfono">
      <NInput v-model:value="form.telefono" placeholder="Teléfono" />
    </NFormItem>

    <NFormItem label="Activo">
      <NSwitch v-model:value="form.activo" />
    </NFormItem>

    <NSpace justify="end">
      <NButton secondary @click="emit('cancel')"> Cancelar </NButton>

      <NButton type="primary" attr-type="submit" :loading="loading"> Guardar </NButton>
    </NSpace>
  </NForm>
</template>
