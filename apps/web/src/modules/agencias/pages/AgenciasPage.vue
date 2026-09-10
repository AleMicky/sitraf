<script setup lang="ts">
import { ref, computed } from 'vue'

import AgenciaForm from '../components/AgenciaForm.vue'

import { useAgenciasQuery } from '../queries/agencia.queries'
import { useCreateAgenciaMutation } from '../queries/agencia.mutations'

import type { AgenciaFormValues } from '../validations/agencia.schema'

const page = ref(1)
const pageSize = ref(10)
const search = ref('')

const showModal = ref(false)

const {
  data,
  isLoading,
  isError,
  refetch,
} = useAgenciasQuery(page, pageSize, search)

const createMutation = useCreateAgenciaMutation()

const totalAgencias = computed(() => data.value?.total ?? 0)
const agenciasActivas = computed(() => {
  if (!data.value?.data) return 0
  return data.value.data.filter((a) => a.activo !== false).length
})

const openCreateModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleCreate = async (values: AgenciaFormValues) => {
  try {
    await createMutation.mutateAsync(values)
    showModal.value = false
  } catch {
    // handled by createMutation state
  }
}

const handleSearchInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  search.value = target.value
  page.value = 1
}

const clearSearch = () => {
  search.value = ''
  page.value = 1
}
</script>

<template>
  <div class="agencias-page">
    <!-- Header Page Title & Action -->
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 pb-3 mb-4 border-bottom">
      <div>
        <div class="d-flex align-items-center gap-2">
          <div class="bg-primary text-white rounded-3 d-inline-flex p-2 shadow-sm">
            <i class="bi bi-building fs-5"></i>
          </div>
          <div>
            <h1 class="h3 mb-0 fw-bold text-dark">Agencias</h1>
            <p class="text-muted small mb-0">
              Administración y control de sucursales operativas en el sistema
            </p>
          </div>
        </div>
      </div>

      <div class="d-flex align-items-center gap-2">
        <button
          type="button"
          class="btn btn-outline-secondary d-inline-flex align-items-center gap-2 shadow-sm"
          :disabled="isLoading"
          title="Actualizar datos"
          @click="() => refetch()"
        >
          <i class="bi bi-arrow-clockwise" :class="{ 'spin-icon': isLoading }"></i>
          <span class="d-none d-sm-inline">Refrescar</span>
        </button>

        <button
          type="button"
          class="btn btn-primary d-inline-flex align-items-center gap-2 shadow-sm px-3"
          @click="openCreateModal"
        >
          <i class="bi bi-plus-lg"></i>
          <span>Nueva Agencia</span>
        </button>
      </div>
    </div>

    <!-- Metric Stat Cards -->
    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm rounded-3 overflow-hidden">
          <div class="card-body p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <p class="text-muted small fw-medium mb-1">Total Registradas</p>
                <h3 class="mb-0 fw-bold text-dark">
                  <span v-if="isLoading" class="placeholder col-4"></span>
                  <span v-else>{{ totalAgencias }}</span>
                </h3>
              </div>
              <div class="stat-icon bg-primary-subtle text-primary rounded-3 p-3">
                <i class="bi bi-buildings fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm rounded-3 overflow-hidden">
          <div class="card-body p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <p class="text-muted small fw-medium mb-1">Agencias Activas (Página)</p>
                <h3 class="mb-0 fw-bold text-success">
                  <span v-if="isLoading" class="placeholder col-4"></span>
                  <span v-else>{{ agenciasActivas }}</span>
                </h3>
              </div>
              <div class="stat-icon bg-success-subtle text-success rounded-3 p-3">
                <i class="bi bi-check-circle fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm rounded-3 overflow-hidden">
          <div class="card-body p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <p class="text-muted small fw-medium mb-1">Página Actual</p>
                <h3 class="mb-0 fw-bold text-info">
                  <span v-if="isLoading" class="placeholder col-4"></span>
                  <span v-else>{{ page }} <small class="text-muted fs-6 fw-normal">/ {{ data?.totalPages || 1 }}</small></span>
                </h3>
              </div>
              <div class="stat-icon bg-info-subtle text-info rounded-3 p-3">
                <i class="bi bi-layers fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Table Container -->
    <div class="card border-0 shadow-sm rounded-3 overflow-hidden">
      <!-- Search and Filter Bar -->
      <div class="card-header bg-white py-3 border-bottom border-light-subtle">
        <div class="row g-2 align-items-center justify-content-between">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="input-group">
              <span class="input-group-text bg-light border-end-0 text-muted">
                <i class="bi bi-search"></i>
              </span>
              <input
                :value="search"
                type="text"
                class="form-control border-start-0 ps-0 bg-light"
                placeholder="Buscar por nombre o código..."
                @input="handleSearchInput"
              />
              <button
                v-if="search"
                class="btn btn-light border border-start-0 text-muted"
                type="button"
                title="Limpiar búsqueda"
                @click="clearSearch"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>

          <div class="col-auto">
            <span class="badge bg-light text-secondary border fw-normal py-2 px-3">
              <i class="bi bi-info-circle me-1"></i>
              Mostrando <strong class="text-dark">{{ data?.data?.length || 0 }}</strong> de <strong class="text-dark">{{ totalAgencias }}</strong> registros
            </span>
          </div>
        </div>
      </div>

      <!-- Loading Skeleton / Spinner State -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-grow text-primary mb-3" role="status" style="width: 2.5rem; height: 2.5rem;">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <h6 class="fw-semibold text-dark mb-1">Cargando catálogo de agencias</h6>
        <p class="text-muted small">Por favor espera un momento...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="isError" class="p-4">
        <div class="alert alert-danger d-flex align-items-center justify-content-between rounded-3 p-3 mb-0" role="alert">
          <div class="d-flex align-items-center gap-3">
            <i class="bi bi-exclamation-triangle-fill fs-3 text-danger"></i>
            <div>
              <h6 class="alert-heading fw-bold mb-1">Error de conexión</h6>
              <p class="mb-0 small">No se pudo cargar la lista de agencias desde el servidor.</p>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-danger btn-sm px-3 shadow-sm"
            @click="() => refetch()"
          >
            <i class="bi bi-arrow-repeat me-1"></i>
            Reintentar
          </button>
        </div>
      </div>

      <!-- Data Table or Empty State -->
      <template v-else>
        <!-- Empty State -->
        <div v-if="!data?.data || data.data.length === 0" class="text-center py-5 px-3">
          <div class="empty-state-icon bg-light text-muted rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3">
            <i class="bi bi-building-slash fs-1"></i>
          </div>
          <h5 class="fw-bold text-dark mb-1">No se encontraron agencias</h5>
          <p class="text-muted small mx-auto mb-4" style="max-width: 380px;">
            <span v-if="search">No hay resultados que coincidan con la búsqueda "<strong>{{ search }}</strong>".</span>
            <span v-else>Aún no has registrado ninguna agencia en el sistema. ¡Empieza creando la primera!</span>
          </p>
          <div class="d-flex justify-content-center gap-2">
            <button
              v-if="search"
              class="btn btn-outline-secondary btn-sm px-3"
              @click="clearSearch"
            >
              <i class="bi bi-eraser me-1"></i> Limpiar búsqueda
            </button>
            <button
              class="btn btn-primary btn-sm px-3"
              @click="openCreateModal"
            >
              <i class="bi bi-plus-lg me-1"></i> Crear nueva agencia
            </button>
          </div>
        </div>

        <!-- Table View -->
        <div v-else class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light border-bottom text-uppercase text-secondary" style="font-size: 0.75rem; letter-spacing: 0.05em;">
              <tr>
                <th class="ps-4 py-3" style="width: 120px;">Código</th>
                <th class="py-3">Agencia</th>
                <th class="py-3">Dirección</th>
                <th class="py-3">Teléfono</th>
                <th class="py-3 text-center" style="width: 110px;">Estado</th>
                <th class="pe-4 py-3 text-end" style="width: 100px;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="agencia in data.data" :key="agencia.id" class="table-row-hover">
                <!-- Código -->
                <td class="ps-4 py-3">
                  <span class="badge bg-light text-dark border font-monospace px-2 py-1">
                    {{ agencia.codigo }}
                  </span>
                </td>

                <!-- Nombre -->
                <td class="py-3">
                  <div class="d-flex align-items-center gap-2">
                    <div class="avatar-initials bg-primary-subtle text-primary fw-bold rounded-2 d-flex align-items-center justify-content-center">
                      {{ agencia.nombre.substring(0, 2).toUpperCase() }}
                    </div>
                    <div>
                      <div class="fw-semibold text-dark">{{ agencia.nombre }}</div>
                      <small v-if="agencia.createdAt" class="text-muted" style="font-size: 0.75rem;">
                        Registrado {{ new Date(agencia.createdAt).toLocaleDateString() }}
                      </small>
                    </div>
                  </div>
                </td>

                <!-- Dirección -->
                <td class="py-3">
                  <div v-if="agencia.direccion" class="d-flex align-items-center text-muted small">
                    <i class="bi bi-geo-alt me-1 text-secondary"></i>
                    <span>{{ agencia.direccion }}</span>
                  </div>
                  <span v-else class="text-muted fst-italic small">- Sin dirección -</span>
                </td>

                <!-- Teléfono -->
                <td class="py-3">
                  <div v-if="agencia.telefono" class="d-flex align-items-center text-muted small">
                    <i class="bi bi-telephone me-1 text-secondary"></i>
                    <a :href="`tel:${agencia.telefono}`" class="text-decoration-none text-muted hover-underline">
                      {{ agencia.telefono }}
                    </a>
                  </div>
                  <span v-else class="text-muted fst-italic small">-</span>
                </td>

                <!-- Estado -->
                <td class="py-3 text-center">
                  <span
                    v-if="agencia.activo !== false"
                    class="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-2 py-1 fw-medium"
                  >
                    <i class="bi bi-dot me-0"></i> Activo
                  </span>
                  <span
                    v-else
                    class="badge rounded-pill bg-secondary-subtle text-secondary border border-secondary-subtle px-2 py-1 fw-medium"
                  >
                    <i class="bi bi-dot me-0"></i> Inactivo
                  </span>
                </td>

                <!-- Acciones -->
                <td class="pe-4 py-3 text-end">
                  <div class="btn-group btn-group-sm">
                    <button
                      type="button"
                      class="btn btn-outline-light text-secondary btn-sm"
                      title="Detalles"
                    >
                      <i class="bi bi-three-dots-vertical"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Footer -->
        <div
          v-if="data && data.total > 0"
          class="card-footer bg-white py-3 border-top border-light-subtle d-flex flex-wrap justify-content-between align-items-center gap-3"
        >
          <div class="text-muted small">
            Página <strong class="text-dark">{{ page }}</strong> de <strong class="text-dark">{{ data.totalPages || 1 }}</strong>
            ({{ data.total }} registros en total)
          </div>

          <BPagination
            v-if="data.total > pageSize"
            v-model="page"
            :total-rows="data.total"
            :per-page="pageSize"
            class="mb-0"
            size="sm"
          />
        </div>
      </template>
    </div>

    <!-- Modal para Nueva Agencia (Compacto) -->
    <BModal
      v-model="showModal"
      centered
      hide-footer
      :footer-class="'d-none'"
      header-class="border-bottom py-2 px-3"
      body-class="p-3"
    >
      <template #title>
        <div class="d-flex align-items-center gap-2">
          <div class="bg-primary-subtle text-primary rounded-2 p-2 d-flex align-items-center justify-content-center" style="width: 36px; height: 36px;">
            <i class="bi bi-building-add fs-5"></i>
          </div>
          <div>
            <h5 class="modal-title fw-bold mb-0">Registrar Nueva Agencia</h5>
            <small class="text-muted fw-normal">Ingresa los datos para habilitar una nueva sucursal</small>
          </div>
        </div>
      </template>

      <div
        v-if="createMutation.isError.value"
        class="alert alert-danger d-flex align-items-center gap-2 mb-3 rounded-3"
        role="alert"
      >
        <i class="bi bi-exclamation-circle-fill"></i>
        <div>No se pudo registrar la agencia. Por favor revisa los datos e inténtalo nuevamente.</div>
      </div>

      <AgenciaForm
        :loading="createMutation.isPending.value"
        @submit="handleCreate"
        @cancel="closeModal"
      />
    </BModal>
  </div>
</template>

<style scoped>
.agencias-page {
  animation: fadeIn 0.25s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-initials {
  width: 36px;
  height: 36px;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.empty-state-icon {
  width: 80px;
  height: 80px;
}

.table-row-hover:hover {
  background-color: rgba(13, 110, 253, 0.02) !important;
}

.hover-underline:hover {
  text-decoration: underline !important;
  color: var(--bs-primary) !important;
}

.spin-icon {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>