import { useApiRequest } from '@/composables/useApiRequest.ts'
import { API } from '@/constants.ts'

export const useAuthService = () => {
  const login = async (email: string, password: string) => {
    try {
      const request = useApiRequest({
        url: API.AUTH.LOGIN,
        params: { email, password },
      })

      if (!request) return
      const { data, error } = await request.post().json()

      // error is handled in useApiRequest
      if (error.value) return

      return data.value
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const logout = async () => {
    try {
      const request = useApiRequest(API.AUTH.LOGOUT)
      if (!request) return
      const { error } = await request.post().json()

      // error is handled in useApiRequest
      if (error.value) return

      return true
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const register = async (email: string, password: string) => {
    try {
      const request = useApiRequest(API.AUTH.SIGNUP_EMAIL_PASSWORD, {
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (!request) return
      const { data, error } = await request.post().json()

      // error is handled in useApiRequest
      if (error.value) return

      return data.value
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return {
    login,
    logout,
    register,
  }
}
