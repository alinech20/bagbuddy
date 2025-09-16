import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/router/auth.ts'
import { profileRoutes } from '@/router/profile.ts'
import { onboardingRoutes } from '@/router/onboarding.ts'
import { useLogger } from '@/composables/useLogger.ts'
import { auth } from '@/config/firebase.ts'
import { onAuthStateChanged } from 'firebase/auth'
import { listsRoutes } from '@/router/lists.ts'
import { useAuthStore } from '@/stores/auth.ts'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...profileRoutes, ...onboardingRoutes, ...listsRoutes],
})

const { debug } = useLogger()

router.beforeEach(async (to, _from, next) => {
  debug('Before navigation')
  let isAuthenticated = false

  if (!auth) {
    debug('Auth object not initialized')
    return next({ name: 'Get Started' })
  }

  const { user: loggedUser } = storeToRefs(useUserStore())

  await new Promise((resolve) => {
    debug('Setting up auth state listener in router guard')
    const unsub = onAuthStateChanged(auth, async (user) => {
      debug('Auth state changed callback triggered')
      isAuthenticated = !!user

      if (isAuthenticated && (!loggedUser.value || !Object.keys(loggedUser.value).length))
        await useAuthStore().handleLogin(user!)

      unsub()
      resolve(true)
    })

    setTimeout(() => {
      debug('Timeout triggered')
      unsub()
      resolve(false)
    }, 2000)
  })

  if (!to.name) return next({ name: 'Login' })

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  // if protected route and not authenticated, redirect to login page
  if (requiresAuth && !isAuthenticated) {
    return next({ name: 'Login' })
  }

  if (isAuthenticated && !loggedUser.value.onboarded && !to.name.toString().startsWith('Onboarding')) {
    debug('User not onboarded, redirecting to onboarding')
    return next({ name: 'Onboarding Step', params: { step: 1 } })
  }

  // if authenticated and trying to access login or register, redirect to default
  const authPages = ['Get Started', 'Login', 'Register', 'Forgot Password', 'Onboarding Step']
  debug(`Route name: ${to.name!.toString()}`)

  if (authPages.includes(to.name!.toString()) && isAuthenticated) {
    return next({ name: 'My Profile' })
  }

  return next()
})

export default router
