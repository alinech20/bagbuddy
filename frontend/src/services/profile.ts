import { useApiRequest } from '@/composables/useApiRequest.ts'
import { API } from '@/constants.ts'

export const useProfileService = () => {
  const getOwn = async () => {
    try {
      const request = useApiRequest(API.PROFILE.OWN)
      if (!request) return
      const { data, error } = await request.get().json()

      // error is handled in useApiRequest
      if (error.value) return

      return data.value
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const updateOwn = async (data: any) => {
    try {
      const request = useApiRequest(API.PROFILE.OWN)
      if (!request) return
      const { error } = await request.patch(data).json()

      // error is handled in useApiRequest
      if (error.value) return
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return {
    getOwn,
    updateOwn,
  }
}
