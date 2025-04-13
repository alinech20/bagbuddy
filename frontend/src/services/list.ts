import { API } from '@/constants.ts'
import { useApiRequest } from '@/composables/useApiRequest.ts'

export const useListService = () => {
  const createList = async (payload: any) => {
    const request = useApiRequest(API.LISTS.SAVE)

    if (!request) return
    const { data, error } = await request.post(payload).json()

    if (error.value) {
      throw new Error(error.value)
    }

    return data.value
  }

  return {
    createList,
  }
}
