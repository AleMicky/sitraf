import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/shared/layouts/MainLayout.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MainLayout,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('@/shared/pages/HomePage.vue'),
                },
                {
                    path: 'agencias',
                    name: 'agencias',
                    component: () =>
                        import('@/modules/agencias/pages/AgenciasPage.vue'),
                },
                {
                    path: 'rutas',
                    name: 'rutas',
                    component: () => import('@/shared/pages/HomePage.vue'),
                },
                {
                    path: 'encomiendas',
                    name: 'encomiendas',
                    component: () => import('@/shared/pages/HomePage.vue'),
                },
            ],
        },
    ],
})

export default router