import { useApiRequest } from '@/composables/useApiRequest.ts'
import { API } from '@/constants.ts'

export const useProfileService = () => {
  const getOwn = async () => {
    const request = await useApiRequest(API.PROFILE.GET_OWN)
    if (!request) return
    const { data, error } = await request.get().json()

    if (error.value) {
      throw new Error(error.value)
    }

    return data.value
  }

  return {
    getOwn,
  }
}
