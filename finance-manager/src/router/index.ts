import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Transacciones from '@/views/modules/transacciones/Transacciones.vue'
import reportes from '@/views/modules/reportes/Reportes.vue'
import Inicio from '@/views/modules/inicio/Inicio.vue'
import Metricas from '@/views/modules/metricas/Metricas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: 'inicio',
          name: 'inicio',
          component: Inicio,
        },
        {
          path: 'transacciones', 
          name: 'transacciones',
          component: Transacciones,
        },
        {
          path: 'reportes',
          name: 'reportes',
          component: reportes,
        },
        {
          path: 'metricas',
          name: 'metricas',
          component: Metricas,
        }
      ],
    },
  ],
})

export default router
