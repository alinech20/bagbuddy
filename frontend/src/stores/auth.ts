import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLogger } from '@/composables/useLogger.ts'
import { useAuthService } from '@/services/auth.ts'
import {
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { auth } from '@/config/firebase.ts'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import { useProfileService } from '@/services/profile.ts'
import type { IUser } from '@/types/user.ts'
import { useUserStore } from '@/stores/user.ts'
import router from '@/router'
import { useProfileMapper } from '@/utils/useProfileMapper.ts'

export const useAuthStore = defineStore(PINIA_STORE_KEYS.AUTH, () => {
  const { setUser, clearUser } = useUserStore()
  const {
    login: loginService,
    logout: logoutService,
    register: registerService,
  } = useAuthService()
  const { getOwn } = useProfileService()
  const { mapFetchResponseToUserInterface } = useProfileMapper()

  const { info, debug, error: logError } = useLogger()
  const token = ref('')
  const isAuthenticated = computed(() => !!token.value)

  onAuthStateChanged(auth, async (user: User | null) => {
    info('User state changed')
    clearUser()

    if (user) {
      debug(`Logged in as ${user.email}`)
      token.value = await user.getIdToken()
      const data = await getOwn()
      const mappedResponse = mapFetchResponseToUserInterface(data)

      setUser({
        ...mappedResponse,
        firebase_data: user,
      })
    } else {
      debug('Logged out')
      token.value = ''
    }
  })

  const login = async (email: string, password: string, verify = false) => {
    info('Logging in...')
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )

      if (verify || !userCredentials.user.emailVerified) {
        info('Sending verification email...')
        await sendEmailVerification(userCredentials.user)
      }

      // add this for custom login behavior on the backend
      // const data = await loginService(email, password)
      // if (!data) return

      token.value = await userCredentials.user.getIdToken()

      const data = await getOwn()
      const mappedResponse = mapFetchResponseToUserInterface(data)

      const user: IUser = {
        ...mappedResponse,
        firebase_data: {
          ...userCredentials.user,
        },
      }
      setUser(user)

      if (!user.onboarded) return await router.push({ name: 'Onboarding' })
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
      logError(JSON.stringify(error))
    }
  }

  const register = async (email: string, password: string) => {
    info('Registering...')
    try {
      const data = await registerService(email, password)
      if (!data) return

      await login(email, password, true)
    } catch (error: any) {
      logError(JSON.stringify(error))
    }
  }

  return { isAuthenticated, token, login, logout, register }
})
