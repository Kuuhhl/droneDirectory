import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue')
    },
    {
      path: '/locations',
      name: 'locations',
      component: () => import('../views/LocationsView.vue')
    },

    {
      path: '/location/:id',
      name: 'location',
      component: () => import('../views/LocationView.vue'),
      props: true
    },
    {
      path: '/location/contribute',
      name: 'contribute',
      component: () => import('../views/ContributeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    }
  ]
})

export default router
