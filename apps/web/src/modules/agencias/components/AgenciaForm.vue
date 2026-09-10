<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import {
  agenciaSchema,
  type AgenciaFormValues,
} from '../validations/agencia.schema'

const props = defineProps<{
  initialValues?: Partial<AgenciaFormValues>
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [values: AgenciaFormValues]
  cancel: []
}>()

const {
  defineField,
  handleSubmit,
  errors,
  resetForm,
} = useForm<AgenciaFormValues>({
  validationSchema: toTypedSchema(agenciaSchema),
  initialValues: {
    codigo: props.initialValues?.codigo ?? '',
    nombre: props.initialValues?.nombre ?? '',
    direccion: props.initialValues?.direccion ?? '',
    telefono: props.initialValues?.telefono ?? '',
  },
})

const [codigo, codigoProps] = defineField('codigo')
const [nombre, nombreProps] = defineField('nombre')
const [direccion, direccionProps] = defineField('direccion')
const [telefono, telefonoProps] = defineField('telefono')

const onCodeInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  codigo.value = target.value.toUpperCase().replace(/\s+/g, '')
}

const onSubmit = handleSubmit((values) => {
  emit('submit', {
    ...values,
    codigo: values.codigo.trim().toUpperCase(),
    nombre: values.nombre.trim(),
    direccion: values.direccion?.trim() || undefined,
    telefono: values.telefono?.trim() || undefined,
  })
})

const onCancel = () => {
  resetForm()
  emit('cancel')
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="compact-form" novalidate>
    <div class="row g-2">
      <!-- Código -->
      <div class="col-sm-4">
        <label for="codigo" class="form-label mb-1 fw-semibold small text-secondary">
          Código <span class="text-danger">*</span>
        </label>
        <div class="input-group input-group-sm">
          <span class="input-group-text bg-light text-muted border-end-0">
            <i class="bi bi-upc-scan"></i>
          </span>
          <input
            id="codigo"
            v-bind="codigoProps"
            :value="codigo"
            type="text"
            class="form-control font-monospace text-uppercase"
            :class="{ 'is-invalid': !!errors.codigo }"
            placeholder="LPZ-01"
            maxlength="20"
            :disabled="loading"
            autocomplete="off"
            @input="onCodeInput"
          />
        </div>
        <div v-if="errors.codigo" class="text-danger small mt-1" style="font-size: 0.72rem;">
          {{ errors.codigo }}
        </div>
      </div>

      <!-- Nombre -->
      <div class="col-sm-8">
        <label for="nombre" class="form-label mb-1 fw-semibold small text-secondary">
          Nombre de Agencia <span class="text-danger">*</span>
        </label>
        <div class="input-group input-group-sm">
          <span class="input-group-text bg-light text-muted border-end-0">
            <i class="bi bi-building"></i>
          </span>
          <input
            id="nombre"
            v-bind="nombreProps"
            v-model="nombre"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': !!errors.nombre }"
            placeholder="Sucursal Central La Paz"
            maxlength="100"
            :disabled="loading"
          />
        </div>
        <div v-if="errors.nombre" class="text-danger small mt-1" style="font-size: 0.72rem;">
          {{ errors.nombre }}
        </div>
      </div>

      <!-- Dirección -->
      <div class="col-12 mt-2">
        <label for="direccion" class="form-label mb-1 fw-semibold small text-secondary">
          Dirección
        </label>
        <div class="input-group input-group-sm">
          <span class="input-group-text bg-light text-muted border-end-0">
            <i class="bi bi-geo-alt"></i>
          </span>
          <input
            id="direccion"
            v-bind="direccionProps"
            v-model="direccion"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': !!errors.direccion }"
            placeholder="Av. 16 de Julio #1420, Zona Central"
            maxlength="200"
            :disabled="loading"
          />
        </div>
        <div v-if="errors.direccion" class="text-danger small mt-1" style="font-size: 0.72rem;">
          {{ errors.direccion }}
        </div>
      </div>

      <!-- Teléfono -->
      <div class="col-12 mt-2">
        <label for="telefono" class="form-label mb-1 fw-semibold small text-secondary">
          Teléfono / Celular
        </label>
        <div class="input-group input-group-sm">
          <span class="input-group-text bg-light text-muted border-end-0">
            <i class="bi bi-telephone"></i>
          </span>
          <input
            id="telefono"
            v-bind="telefonoProps"
            v-model="telefono"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': !!errors.telefono }"
            placeholder="+591 2 2441122 / 71234567"
            maxlength="30"
            :disabled="loading"
          />
        </div>
        <div v-if="errors.telefono" class="text-danger small mt-1" style="font-size: 0.72rem;">
          {{ errors.telefono }}
        </div>
      </div>
    </div>

    <!-- Modal Footer Actions (Compact) -->
    <div class="d-flex justify-content-end align-items-center gap-2 mt-3 pt-2 border-top">
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary px-3"
        :disabled="loading"
        @click="onCancel"
      >
        Cancelar
      </button>

      <button
        type="submit"
        class="btn btn-sm btn-primary d-flex align-items-center gap-1 px-3 shadow-sm"
        :disabled="loading"
      >
        <span
          v-if="loading"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <i v-else class="bi bi-check-lg"></i>
        {{ loading ? 'Guardando...' : 'Guardar' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.compact-form {
  font-size: 0.85rem;
}

.input-group-text {
  border-color: #dee2e6;
  font-size: 0.8rem;
  padding: 0.35rem 0.5rem;
}

.form-control {
  font-size: 0.85rem;
  padding: 0.35rem 0.6rem;
}

.form-control:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
}

.font-monospace {
  letter-spacing: 0.05em;
}
</style>