<script setup lang="ts">
import { ref } from 'vue'
import '@/assets/dashboard.css'

const isMobileNavOpen = ref(false)

const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value
}

const closeMobileNav = () => {
  isMobileNavOpen.value = false
}
</script>

<template>
  <div class="layout-container">
    <!-- Backdrop for Mobile -->
    <div
      v-if="isMobileNavOpen"
      class="sidebar-backdrop d-md-none"
      @click="closeMobileNav"
    ></div>

    <!-- 1. Compact Sidebar Navigation (Left Column) -->
    <aside class="sidebar-wrapper" :class="{ show: isMobileNavOpen }">
      <!-- Brand Header -->
      <div class="sidebar-header justify-content-between">
        <RouterLink to="/" class="d-flex align-items-center gap-2 text-white text-decoration-none" @click="closeMobileNav">
          <div class="bg-primary text-white rounded d-flex align-items-center justify-content-center" style="width: 28px; height: 28px;">
            <i class="bi bi-truck fs-6"></i>
          </div>
          <span class="fw-bold fs-6 tracking-wide">SITRAF</span>
        </RouterLink>

        <button
          class="btn btn-sm btn-link text-white-50 d-md-none p-0"
          type="button"
          @click="closeMobileNav"
        >
          <i class="bi bi-x-lg fs-5"></i>
        </button>
      </div>

      <!-- Scrollable Nav Items -->
      <div class="sidebar-scrollable">
        <div class="sidebar-section-title">Navegación</div>
        <nav class="nav flex-column mb-3">
          <RouterLink
            to="/"
            class="sidebar-item"
            exact-active-class="active"
            @click="closeMobileNav"
          >
            <i class="bi bi-grid-1x2"></i>
            <span>Dashboard</span>
          </RouterLink>

          <RouterLink
            to="/agencias"
            class="sidebar-item"
            exact-active-class="active"
            @click="closeMobileNav"
          >
            <i class="bi bi-building"></i>
            <span>Agencias</span>
          </RouterLink>

          <RouterLink
            to="/rutas"
            class="sidebar-item"
            exact-active-class="active"
            @click="closeMobileNav"
          >
            <i class="bi bi-geo-alt"></i>
            <span>Rutas</span>
          </RouterLink>

          <RouterLink
            to="/encomiendas"
            class="sidebar-item"
            exact-active-class="active"
            @click="closeMobileNav"
          >
            <i class="bi bi-box-seam"></i>
            <span>Encomiendas</span>
          </RouterLink>
        </nav>

        <div class="sidebar-section-title">Reportes</div>
        <nav class="nav flex-column">
          <a class="sidebar-item" href="#" @click.prevent>
            <i class="bi bi-calendar-check"></i>
            <span>Mes actual</span>
          </a>
          <a class="sidebar-item" href="#" @click.prevent>
            <i class="bi bi-file-earmark-bar-graph"></i>
            <span>Consolidado</span>
          </a>
        </nav>
      </div>

      <!-- Compact Footer -->
      <div class="sidebar-footer d-flex align-items-center justify-content-between">
        <span>v1.0</span>
        <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill py-1 px-2">Online</span>
      </div>
    </aside>

    <!-- 2. Main View Area (Right Column) -->
    <div class="main-view-wrapper">
      <!-- Top Navbar Header -->
      <header class="top-navbar">
        <div class="d-flex align-items-center gap-2">
          <!-- Mobile Menu Trigger Button -->
          <button
            class="btn btn-sm btn-light border-0 d-md-none text-dark"
            type="button"
            aria-label="Abrir menú"
            @click="toggleMobileNav"
          >
            <i class="bi bi-list fs-5"></i>
          </button>

          <!-- Breadcrumb / Search hint -->
          <div class="d-none d-sm-flex align-items-center text-muted small">
            <span class="fw-medium text-dark">SITRAF</span>
            <i class="bi bi-chevron-right mx-1 text-muted" style="font-size: 0.7rem;"></i>
            <span>Sistema de Transporte & Encomiendas</span>
          </div>
        </div>

        <!-- Right Header Items -->
        <div class="d-flex align-items-center gap-2">
          <!-- Search box -->
          <div class="input-group input-group-sm d-none d-md-flex" style="width: 220px;">
            <span class="input-group-text bg-light border-end-0 text-muted">
              <i class="bi bi-search"></i>
            </span>
            <input
              type="text"
              class="form-control bg-light border-start-0 ps-0"
              placeholder="Buscar..."
            />
          </div>

          <!-- Notification Button -->
          <button
            type="button"
            class="btn btn-sm btn-light text-secondary rounded-circle position-relative p-2"
            title="Notificaciones"
          >
            <i class="bi bi-bell"></i>
          </button>

          <div class="vr mx-1 text-muted opacity-25" style="height: 20px;"></div>

          <!-- User Profile -->
          <div class="d-flex align-items-center gap-2">
            <div class="bg-primary-subtle text-primary fw-bold rounded-circle d-flex align-items-center justify-content-center" style="width: 30px; height: 30px; font-size: 0.75rem;">
              OP
            </div>
            <div class="d-none d-lg-block text-start lh-1">
              <div class="fw-semibold text-dark" style="font-size: 0.78rem;">Operador Central</div>
              <small class="text-muted" style="font-size: 0.68rem;">admin@sitraf.bo</small>
            </div>
          </div>
        </div>
      </header>

      <!-- Scrollable Main Content -->
      <main class="main-scrollable-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>