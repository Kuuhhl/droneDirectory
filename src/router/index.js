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
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue'),
      meta: {
        title: 'Map',
        metaTags: [{ name: 'description', content: 'The map of the world' }]
      }
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
      component: () => import('../views/ContributeView.vue'),
      meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useIsLoggedInStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  console.log('isLoggedIn', isLoggedIn)
  console.log(to)
  console.log(to.path)
  console.log(to.fullPath)
  if (requiresAuth && !isLoggedIn && to.path !== '/login') {
    next({ path: '/login', query: { forward: to.fullPath } })
  } else {
    next()
  }
})
export default router
