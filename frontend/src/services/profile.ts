import { useApiRequest } from '@/composables/useApiRequest.ts'
import { API } from '@/constants.ts'

export const useProfileService = () => {
  const getOwn = async () => {
    const request = await useApiRequest(API.PROFILE.OWN)
    if (!request) return
    const { data, error } = await request.get().json()

    if (error.value) {
      throw new Error(error.value)
    }

    return data.value
  }

  const updateOwn = async (data: any) => {
    const request = await useApiRequest(API.PROFILE.OWN)
    if (!request) return
    const { error } = await request.post(data).json()

    if (error.value) {
      throw new Error(error.value)
    }
  }

  return {
    getOwn,
    updateOwn,
  }
}
