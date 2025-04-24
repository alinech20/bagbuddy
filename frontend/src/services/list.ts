import { API } from '@/constants.ts'
import { useApiRequest } from '@/composables/useApiRequest.ts'

export const useListService = () => {
  const createList = async (payload: any) => {
    try {
      const request = useApiRequest(API.LISTS.SAVE)

      if (!request) return
      const { data, error } = await request.post(payload).json()

      // error is handled in useApiRequest
      if (error.value) return

      return data.value
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return {
    createList,
  }
}
