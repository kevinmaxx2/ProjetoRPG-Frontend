import { createRouter, createWebHistory } from 'vue-router'
import Frontpage from '../views/Frontpage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Frontpage,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../components/Dashboard.vue'),
    },
  ],
})

export default router
