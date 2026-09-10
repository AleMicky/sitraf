<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Dashboard</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Compartir
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Exportar
          </button>
        </div>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
        >
          <i class="bi bi-calendar3"></i>
          Esta semana
        </button>
      </div>
    </div>

    <!-- Stats summary cards -->
    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <h6 class="text-muted mb-1">Agencias Activas</h6>
                <h3 class="mb-0 fw-bold">12</h3>
              </div>
              <div class="bg-primary-subtle text-primary p-3 rounded-3">
                <i class="bi bi-building fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <h6 class="text-muted mb-1">Rutas Operativas</h6>
                <h3 class="mb-0 fw-bold">28</h3>
              </div>
              <div class="bg-success-subtle text-success p-3 rounded-3">
                <i class="bi bi-geo-alt fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <h6 class="text-muted mb-1">Encomiendas Hoy</h6>
                <h3 class="mb-0 fw-bold">154</h3>
              </div>
              <div class="bg-warning-subtle text-warning p-3 rounded-3">
                <i class="bi bi-box-seam fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <h6 class="text-muted mb-1">Entregas a Tiempo</h6>
                <h3 class="mb-0 fw-bold">98.5%</h3>
              </div>
              <div class="bg-info-subtle text-info p-3 rounded-3">
                <i class="bi bi-check2-circle fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Title & Table identical to Bootstrap Dashboard Example -->
    <h2 class="h4 mt-4 mb-3">Últimas Operaciones</h2>
    <div class="table-responsive bg-white rounded shadow-sm p-3">
      <table class="table table-striped table-sm align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Código</th>
            <th scope="col">Origen</th>
            <th scope="col">Destino</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1,001</td>
            <td>ENC-84920</td>
            <td>Agencia Central (La Paz)</td>
            <td>Sucursal Cochabamba</td>
            <td><span class="badge bg-success">En tránsito</span></td>
          </tr>
          <tr>
            <td>1,002</td>
            <td>ENC-84921</td>
            <td>Sucursal Santa Cruz</td>
            <td>Agencia Tarija</td>
            <td><span class="badge bg-warning text-dark">Pendiente</span></td>
          </tr>
          <tr>
            <td>1,003</td>
            <td>ENC-84922</td>
            <td>Agencia Central (La Paz)</td>
            <td>Sucursal Oruro</td>
            <td><span class="badge bg-success">Entregado</span></td>
          </tr>
          <tr>
            <td>1,004</td>
            <td>ENC-84923</td>
            <td>Sucursal Potosí</td>
            <td>Sucursal Sucre</td>
            <td><span class="badge bg-primary">Recibido</span></td>
          </tr>
          <tr>
            <td>1,005</td>
            <td>ENC-84924</td>
            <td>Agencia Tarija</td>
            <td>Agencia Central (La Paz)</td>
            <td><span class="badge bg-secondary">Archivado</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>