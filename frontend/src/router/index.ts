import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/router/auth.ts'
import { profileRoutes } from '@/router/profile.ts'
import { onboardingRoutes } from '@/router/onboarding.ts'
import { useLogger } from '@/composables/useLogger.ts'
import { auth } from '@/config/firebase.ts'
import { onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...profileRoutes, ...onboardingRoutes],
})

const { debug } = useLogger()

router.beforeEach(async (to, _from, next) => {
  let isAuthenticated = false

  await new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      isAuthenticated = !!user
      resolve(true)
    })
  })

  debug('Before navigation')
  if (!to.name) next({ name: 'Login' })

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  // if protected route and not authenticated, redirect to login page
  if (requiresAuth && !isAuthenticated) {
    return next({ name: 'Login' })
  }

  // if authenticated and trying to access login or register, redirect to profile
  const authPaths = ['Login', 'Register']
  debug(`Route name: ${to.name!.toString()}`)
  if (authPaths.includes(to.name!.toString()) && isAuthenticated) {
    return next({ name: 'My Profile' })
  }

  return next()
})

export default router
