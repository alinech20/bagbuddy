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
  debug('Before navigation')
  let isAuthenticated = false

  if (!auth) {
    debug('Auth object not initialized')
    return next({ name: 'Login' })
  }

  await new Promise((resolve) => {
    debug('Setting up auth state listener in router guard')
    const unsub = onAuthStateChanged(auth, (user) => {
      debug('Auth state changed callback triggered')
      isAuthenticated = !!user
      resolve(true)
      unsub()
    })

    setTimeout(() => {
      debug('Timeout triggered')
      resolve(false)
    }, 5000)
  })

  if (!to.name) next({ name: 'Login' })

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  // if protected route and not authenticated, redirect to login page
  if (requiresAuth && !isAuthenticated) {
    return next({ name: 'Login' })
  }

  // if authenticated and trying to access login or register, redirect to profile
  const authPages = ['Login', 'Register']
  debug(`Route name: ${to.name!.toString()}`)
  if (authPages.includes(to.name!.toString()) && isAuthenticated) {
    return next({ name: 'My Profile' })
  }

  return next()
})

export default router
