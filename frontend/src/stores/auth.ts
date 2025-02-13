import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLogger } from '@/composables/useLogger.ts'
import { useAuthService } from '@/services/auth.ts'
import { auth } from '@/config/firebase.ts'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import { useProfileService } from '@/services/profile.ts'
import type { IUser } from '@/types/user.ts'
import { useUserStore } from '@/stores/user.ts'

export const useAuthStore = defineStore(PINIA_STORE_KEYS.AUTH, () => {
  const { setUser } = useUserStore()
  const {
    login: loginService,
    logout: logoutService,
    register: registerService,
  } = useAuthService()
  const { getOwn } = useProfileService()

  const { info, debug, error: logError } = useLogger()
  const isAuthenticated = ref(false)
  const token = ref('')

  const login = async (email: string, password: string) => {
    info('Logging in...')
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )

      // const data = await loginService(email, password)
      // if (!data) return

      isAuthenticated.value = true
      token.value = await userCredentials.user.getIdToken()

      const data = JSON.parse(await getOwn())
      const user: IUser = {
        ...data,
        firebase_data: {
          ...userCredentials.user,
        },
      }
      setUser(user)
    } catch (error: any) {
      logError(error.message)
    }
  }

  const logout = async () => {
    info('Logging out...')
    try {
      const data = await logoutService()
      if (!data) return

      isAuthenticated.value = false
      token.value = ''
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
