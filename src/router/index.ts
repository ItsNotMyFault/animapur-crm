import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/app',
      component: DashboardLayout,
      redirect: '/app/clients',
      children: [
        {
          path: 'clients',
          name: 'clients',
          component: () => import('@/views/ClientsListView.vue'),
          meta: { title: 'Clients' },
        },
        {
          path: 'clients/:id',
          name: 'client-detail',
          component: () => import('@/views/ClientDetailView.vue'),
          meta: { title: 'Client detail' },
          props: true,
        },
        {
          path: 'clients/:id/files',
          name: 'client-files',
          component: () => import('@/views/ClientFilesView.vue'),
          meta: { title: 'Client files' },
          props: true,
        },
        {
          path: 'forms',
          name: 'forms',
          component: () => import('@/views/FormsListView.vue'),
          meta: { title: 'Formulaires' },
        },
        {
          path: 'forms/:name',
          name: 'form',
          component: () => import('@/views/FormView.vue'),
          meta: { title: 'Formulaire' },
          props: true,
        },
      ],
    },
  ],
})

export default router
