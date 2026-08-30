import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/shared/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: AppLayout,

      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/shared/pages/HomePage.vue'),
          meta: {
            menuKey: 'home',
          },
        },

        {
          path: 'agencias',
          name: 'agencias',
          component: () => import('@/modules/agencias/pages/AgenciaListPage.vue'),
          meta: {
            menuKey: 'agencias',
          },
        },

        {
          path: 'rutas',
          name: 'rutas',
          component: () => import('@/modules/rutas/pages/RutaListPage.vue'),
          meta: {
            menuKey: 'rutas',
          },
        },

        {
          path: 'encomiendas',
          name: 'encomiendas',
          component: () => import('@/modules/encomiendas/pages/EncomiendaListPage.vue'),
          meta: {
            menuKey: 'encomiendas',
          },
        },
      ],
    },
  ],
})

export default router
