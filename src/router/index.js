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
      path: '/map/:id',
      name: 'location',
      component: () => import('../views/MapView.vue'),
      props: true
    },
    {
      path: '/contribute',
      name: 'contribute',
      component: () => import('../views/ContributeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginRegisterView.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue')
    }
  ]
})

export default router
