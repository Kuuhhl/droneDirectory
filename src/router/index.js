import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useIsLoggedInStore } from '@/stores/isLoggedIn'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/map/:id?',
      name: 'map',
      component: () => import('../views/MapView.vue'),
      props: true,
      meta: {
        title: 'Map',
        metaTags: [{ name: 'description', content: 'Map of the drone spots' }]
      }
    },
    {
      path: '/contribute',
      name: 'contribute',
      component: () => import('../views/ContributeView.vue'),
      props: (route) => ({ query: route.query.data }),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginRegisterView.vue'),
      props: (route) => ({ message: route.query.message })
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useIsLoggedInStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (to.path !== '/login') {
    sessionStorage.setItem('redirectPath', to.fullPath)
  }
  if (requiresAuth && !isLoggedIn && to.path !== '/login') {
    if (to.path === '/contribute') {
      next({ path: '/login', query: { message: 'Log In to contribute' } })
    }
    next({ path: '/login', query: { message: 'Log In to access this page' } })
  } else {
    next()
  }
})

export default router
