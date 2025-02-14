import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/router/auth.ts'
import { profileRoutes } from '@/router/profile.ts'
import { useAuthStore } from '@/stores/auth.ts'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...profileRoutes],
})

// generate auth navigation guard below
router.beforeEach((to, _from, next) => {
  if (!to.name) next({ name: 'Login' })

  const { isAuthenticated } = storeToRefs(useAuthStore())
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  // if protected route and not authenticated, redirect to login page
  if (requiresAuth && !isAuthenticated.value) {
    next({ name: 'Login' })
  } else {
    next()
  }

  // if authenticated and trying to access login or register, redirect to profile
  const authPaths = ['Login', 'Register']
  if (authPaths.includes(to.name!.toString()) && isAuthenticated.value) {
    next({ name: 'My Profile' })
  }
})

export default router
