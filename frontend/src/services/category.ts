import { useApiRequest } from '@/composables/useApiRequest.ts'
import { API } from '@/constants.ts'

export const useCategoryService = () => {
  const getCategories = async () => {
    try {
      const request = useApiRequest(API.CATEGORIES.ALL)
      if (!request) return
      const { data, error } = await request.get().json()

      // error is handled in useApiRequest
      if (error.value) return

      return data.value
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return {
    getCategories,
  }
}
