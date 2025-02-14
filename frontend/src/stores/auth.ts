import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLogger } from '@/composables/useLogger.ts'
import { useAuthService } from '@/services/auth.ts'
import { auth } from '@/config/firebase.ts'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import { useProfileService } from '@/services/profile.ts'
import type { IUser } from '@/types/user.ts'
import { useUserStore } from '@/stores/user.ts'
import router from '@/router'

export const useAuthStore = defineStore(PINIA_STORE_KEYS.AUTH, () => {
  const { setUser } = useUserStore()
  const {
    login: loginService,
    logout: logoutService,
    register: registerService,
  } = useAuthService()
  const { getOwn } = useProfileService()

  const { info, debug, error: logError } = useLogger()
  const token = ref('')
  const isAuthenticated = computed(() => !!token.value)

  const login = async (email: string, password: string) => {
    info('Logging in...')
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )

      // add this for custom login behavior on the backend
      // const data = await loginService(email, password)
      // if (!data) return

      token.value = await userCredentials.user.getIdToken()

      const data = JSON.parse(await getOwn())
      const user: IUser = {
        ...data,
        firebase_data: {
          ...userCredentials.user,
        },
      }
      setUser(user)

      await router.push({ name: 'My Profile' })
    } catch (error: any) {
      logError(error.message)
    }
  }

  const logout = async () => {
    info('Logging out...')
    try {
      await signOut(auth)

      // add this for custom logout behavior on the backend
      // const data = await logoutService()
      // if (!data) return

      token.value = ''
      await router.push({ name: 'Login' })
    } catch (error: any) {
      logError(error.message)
    }
  }

  const register = async (email: string, password: string) => {
    info('Registering...')
    try {
      const data = await registerService(email, password)
      if (!data) return

      await login(email, password)
    } catch (error: any) {
      logError(error.message)
    }
  }

  return { isAuthenticated, token, login, logout, register }
})
