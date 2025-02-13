import { useApiRequest } from '@/composables/useApiRequest.ts'
import { API } from '@/constants.ts'

export const useAuthService = () => {
  const login = async (email: string, password: string) => {
    const request = await useApiRequest({
      url: API.AUTH.LOGIN,
      params: { email, password },
    })

    if (!request) return
    const { data, error } = await request.post().json()

    if (error.value) {
      throw new Error(error.value)
    }

    return data.value
  }

  const logout = async () => {
    const request = await useApiRequest(API.AUTH.LOGOUT)
    if (!request) return
    const { error } = await request.post().json()

    if (error.value) {
      throw new Error(error.value)
    }

    return true
  }

  const register = async (email: string, password: string) => {
    const request = await useApiRequest({
      url: API.AUTH.SIGNUP_EMAIL_PASSWORD,
      params: { email, password },
    })

    if (!request) return
    const { data, error } = await request.post().json()

    if (error.value) {
      throw new Error(error.value)
    }

    return data.value
  }

  return {
    login,
    logout,
    register,
  }
}
